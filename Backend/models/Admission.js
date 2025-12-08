const mongoose = require("mongoose");

const Admission = new mongoose.Schema(
  {
    // Student Personal Details
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    proposedGrade: { type: String, required: true },
    studentPhoto: { type: String }, 
    // Parent/Guardian Details
    parentName: { type: String, required: true },
    relationship: { type: String, required: true },
    parentEmail: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentWhatsApp: { type: String, required: true },

    // Academic History & Documents
    previousSchool: { type: String },
    previousGrade: { type: String },
    birthCertificate: { type: String }, 
    previousMarksheets: { type: String }, 

    // Emergency
    emergencyName: { type: String, required: true },
    emergencyRelationship: { type: String, required: true },
    emergencyPhone: { type: String, required: true },

    additionalNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", Admission);
