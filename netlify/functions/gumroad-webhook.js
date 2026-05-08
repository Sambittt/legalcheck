const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// We use an environment variable for the service account
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!global.adminApp) {
  global.adminApp = initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Gumroad sends data as application/x-www-form-urlencoded
    const params = new URLSearchParams(event.body);
    const email = params.get('email');
    const productPermalink = params.get('permalink');
    const licenseKey = params.get('license_key');
    const price = params.get('price');

    if (!email) {
      return { statusCode: 400, body: 'Missing email' };
    }

    // Determine plan type based on permalink or price
    const plan = price > 1000 ? 'lifetime' : 'single'; // Price is in cents

    // Find user by email in Firestore
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email.toLowerCase()).get();

    if (snapshot.empty) {
      console.log(`No user found with email ${email}. Storing pending purchase.`);
      // Optional: Store in a 'pending_purchases' collection
      await db.collection('pending_purchases').doc(email.toLowerCase()).set({
        plan,
        licenseKey,
        purchasedAt: new Date(),
        productPermalink
      });
    } else {
      // Update all matching user documents (usually just one)
      const batch = db.batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref, {
          plan,
          licenseKey,
          unlockedAt: new Date(),
          checksRemaining: plan === 'lifetime' ? 999999 : 1
        });
      });
      await batch.commit();
      console.log(`Updated plan for ${email} to ${plan}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Webhook Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
