const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const Admission = require("../models/Admission");

const upload = multer({ storage });

// Handle file fields
const fileFields = upload.fields([
  { name: "studentPhoto", maxCount: 1 },
  { name: "birthCertificate", maxCount: 1 },
  { name: "previousMarksheets", maxCount: 1 },
]);

router.post("/", fileFields, async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      proposedGrade,
      parentName,
      relationship,
      parentEmail,
      parentPhone,
      parentWhatsApp,
      previousSchool,
      previousGrade,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      additionalNotes,
    } = req.body;

    const studentPhoto = req.files["studentPhoto"]?.[0]?.path || "";
    const birthCertificate = req.files["birthCertificate"]?.[0]?.path || "";
    const previousMarksheets = req.files["previousMarksheets"]?.[0]?.path || "";

    const newAdmission = new Admission({
      fullName,
      dateOfBirth,
      gender,
      nationality,
      proposedGrade,
      parentName,
      relationship,
      parentEmail,
      parentPhone,
      parentWhatsApp,
      previousSchool,
      previousGrade,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      additionalNotes,
      studentPhoto,
      birthCertificate,
      previousMarksheets,
    });

    await newAdmission.save();

    res.status(201).json({
      success: true,
      message: "Admission application submitted successfully",
      data: newAdmission,
    });
  } catch (error) {
    console.error("Error submitting admission:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
