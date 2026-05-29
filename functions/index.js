const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();

const app = express();
app.use(express.json());

/**
 * 🔐 LEVEL K ADMIN ROLE SETTER
 */
app.post("/setAdminRole", async (req, res) => {
  try {
    
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "UID required"
      });
    }

    // 🔐 Set admin custom claim
    await admin.auth().setCustomUserClaims(uid, {
      admin: true,
      role: "superadmin"
    });

    // Force token refresh
    await admin.auth().revokeRefreshTokens(uid);

    return res.status(200).json({
      success: true,
      message: "Admin role assigned",
      uid
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

exports.api = functions.https.onRequest(app);
