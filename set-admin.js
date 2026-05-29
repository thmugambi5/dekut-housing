const admin = require("firebase-admin");

// 🔐 IMPORTANT: download this from Firebase Console
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = "buUhvoYLQ5NmtHeuMwSPgXJsrBm2";

async function setAdmin() {
  try {
    
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
      role: "superadmin"
    });

    console.log("✅ ADMIN CLAIM SET SUCCESSFULLY");
    console.log("UID:", uid);

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}

setAdmin();
