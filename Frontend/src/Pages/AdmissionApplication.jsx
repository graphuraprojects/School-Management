import React, { useState } from 'react'
import "../Styles/AdmissionApplication.css"

function AdmissionApplication() {
  const [formData, setFormData] = useState({
    // Student Personal Details
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    proposedGrade: '',
    studentPhoto: null,
    
    // Parent/Guardian Details
    parentName: '',
    relationship: '',
    parentEmail: '',
    parentPhone: '',
    parentWhatsApp: '',
    
    // Academic History & Documents
    previousSchool: '',
    previousGrade: '',
    birthCertificate: null,
    previousMarksheets: null,
    
    // Emergency Contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    
    // Declaration
    agreeTerms: false,
    additionalNotes: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Connect to backend API
  }

  return (
    <div className="admission-container">
      <div className="admission-wrapper">
        {/* Header Section */}
        <div className="admission-header">
          <h1>Admission Application</h1>
          <p>
            Welcome to the EduConnect Hub online admission portal. Please fill out the form below 
            carefully, providing all necessary details and uploading required documents. Your journey 
            with us begins here!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admission-form">
          
          {/* Section 1: Student Personal Details */}
          <section className="form-section">
            <div className="section-header">
              <h2>Student Personal Details</h2>
              <p>Please provide the basic information of the student applying.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter student's full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  placeholder="Enter nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="proposedGrade">Proposed Grade / Class</label>
                <select
                  id="proposedGrade"
                  name="proposedGrade"
                  value={formData.proposedGrade}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select grade</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="studentPhoto">Student Photo</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="studentPhoto"
                    name="studentPhoto"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <span className="file-hint">Upload a recent passport-sized photograph of the student (JPG, PNG, max 5MB)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Parent/Guardian Details */}
          <section className="form-section">
            <div className="section-header">
              <h2>Parent / Guardian Details</h2>
              <p>Provide contact information for the primary parent or guardian.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="parentName">Full Name</label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  placeholder="Enter parent/guardian's full name"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="relationship">Relationship to Student</label>
                <select
                  id="relationship"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="guardian">Guardian</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="parentEmail">Email Address</label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  placeholder="e.g., parent@example.com"
                  value={formData.parentEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="parentPhone">Phone Number</label>
                <input
                  type="tel"
                  id="parentPhone"
                  name="parentPhone"
                  placeholder="e.g., +91 98765 43210"
                  value={formData.parentPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="parentWhatsApp">WhatsApp Number</label>
                <input
                  type="tel"
                  id="parentWhatsApp"
                  name="parentWhatsApp"
                  placeholder="e.g., +91 98765 43210"
                  value={formData.parentWhatsApp}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 3: Academic History & Documents */}
          <section className="form-section">
            <div className="section-header">
              <h2>Academic History & Documents</h2>
              <p>Details of previous schooling and required document uploads.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="previousSchool">Previous School Name</label>
                <input
                  type="text"
                  id="previousSchool"
                  name="previousSchool"
                  placeholder="Enter previous school's name"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="previousGrade">Previous Grade / Class</label>
                <input
                  type="text"
                  id="previousGrade"
                  name="previousGrade"
                  placeholder="Enter previous grade/class"
                  value={formData.previousGrade}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="birthCertificate">Birth Certificate</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="birthCertificate"
                    name="birthCertificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange}
                  />
                  <span className="file-hint">Upload a scanned copy of the student's birth certificate (PDF, JPG, max 5MB)</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="previousMarksheets">Previous Marksheets</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="previousMarksheets"
                    name="previousMarksheets"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange}
                  />
                  <span className="file-hint">Upload scanned copies of previous academic year marksheets (PDF, JPG, max 10MB)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Emergency Contact */}
          <section className="form-section">
            <div className="section-header">
              <h2>Emergency Contact</h2>
              <p>Provide details for an emergency contact person.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="emergencyName">Full Name</label>
                <input
                  type="text"
                  id="emergencyName"
                  name="emergencyName"
                  placeholder="Enter emergency contact's full name"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="emergencyRelationship">Relationship to Student</label>
                <input
                  type="text"
                  id="emergencyRelationship"
                  name="emergencyRelationship"
                  placeholder="e.g., Aunt, Uncle, Grandparent"
                  value={formData.emergencyRelationship}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="emergencyPhone">Phone Number</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="emergencyPhone"
                  placeholder="e.g., +91 98765 43210"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          {/* Section 5: Declaration & Additional Notes */}
          {/* <section className="form-section">
            <div className="section-header">
              <h2>Declaration & Additional Notes</h2>
              <p>Please review and agree to the terms, and add any additional information.</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group full-width checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span>I agree to the <a href="/terms" className="terms-link">terms and conditions</a> of EduConnect Hub.</span>
                </label>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="additionalNotes">Additional Notes (Optional)</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Any specific information or requests for the admission team..."
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
            </div>
          </section> */}

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdmissionApplication