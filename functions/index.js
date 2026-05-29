const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * 🔐 LEVEL K SECURITY FUNCTION
 * This manually grants admin role to your UID
 */
exports.setAdminRole = functions.https.onRequest(async (req, res) => {
  
  try {
    
    // 🔴 SECURITY: Only allow POST requests
    if (req.method !== "POST") {
      return res.status(403).send("Forbidden");
    }

    const { uid } = req.body;

    if (!uid) {
      return res.status(400).send("UID required");
    }

    // 🔐 SET CUSTOM CLAIM (REAL ADMIN PRIVILEGE)
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
      role: "superadmin"
    });

    // Optional: force token refresh later
    await admin.auth().revokeRefreshTokens(uid);

    return res.status(200).send({
      success: true,
      message: "Admin role assigned",
      uid: uid
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message
    });
  }
});
