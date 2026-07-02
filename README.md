# Canonical Candidate Profile Engine

> **Eightfold Engineering Internship Assignment**

A modular data transformation pipeline that converts heterogeneous candidate data (Recruiter CSV + Resume PDF) into a standardized **Canonical Candidate Profile** enriched with provenance, confidence scores, validation, and configurable projections.

---

## Author

**Hardik Saxena**

B.Tech Computer Science Engineering

GL Bajaj Institute of Technology and Management

---

# Features

- CSV Parser
- Resume PDF Parser
- Google Gemini LLM Resume Extraction
- Canonical Candidate Schema
- Candidate Matching
- Profile Merging
- Phone Number Normalization
- Confidence Engine
- Provenance Engine
- Schema Validation
- Configuration Driven Projection Engine
- JSON Output Generation

---

# Tech Stack

- Node.js
- JavaScript (ES Modules)
- Google Gemini API
- PDF Parser
- CSV Parser

---

# Project Structure

```text
src/
│
├── confidence/
├── config/
├── edgecases/
├── extractors/
├── matcher/
├── merger/
├── models/
├── parsers/
├── projection/
├── provenance/
├── utils/
├── validator/
│
└── main.js

input/
│
├── recruiter.csv
└── resume.pdf

output/
│
├── canonicalCandidate.json
├── recruiterView.json
├── analyticsView.json
└── publicProfile.json

docs/
|
├── candidateSchema.md
├── pipeline.md
```

---

# Architecture

```text
Recruiter CSV               Resume PDF
      │                          │
      ▼                          ▼
 CSV Parser               Resume Parser
      │                          │
      ▼                          ▼
 CSV Extractor      Gemini Resume Extractor
          └──────────────┬──────────────┘
                         ▼
                 Candidate Matcher
                         ▼
                  Profile Merger
                         ▼
              Canonical Candidate
                         ▼
          Provenance + Confidence
                         ▼
                Schema Validator
                         ▼
              Projection Engine
                         ▼
                  JSON Outputs
```

---

# Pipeline

### Step 1

Parse Recruiter CSV.

↓

### Step 2

Convert recruiter rows into Candidate objects.

↓

### Step 3

Parse Resume PDF.

↓

### Step 4

Extract structured information using Google Gemini.

↓

### Step 5

Match recruiter candidate with resume candidate.

↓

### Step 6

Merge both profiles into a single Canonical Candidate.

↓

### Step 7

Generate provenance metadata.

↓

### Step 8

Generate confidence scores.

↓

### Step 9

Validate canonical profile.

↓

### Step 10

Generate configurable projections.

↓

### Step 11

Write JSON outputs.

---

# Canonical Candidate Schema

```text
Candidate
│
├── candidateId
├── fullName
├── emails[]
├── phones[]
├── currentCompany
├── currentTitle
├── location
├── summary
├── skills[]
├── education[]
├── experience[]
├── projects[]
├── certifications[]
├── languages[]
├── links{}
├── confidence{}
└── provenance{}
```

---

# Matching Strategy

Priority used for candidate matching:

1. Email
2. Phone Number
3. Candidate ID
4. Full Name

---

# Merge Strategy

### Primitive Fields

Resume value takes precedence over Recruiter CSV.

Examples:

- Current Company
- Current Title
- Location
- Summary

### Collections

Collections are merged using set union.

Duplicate values are removed.

Examples:

- Skills
- Emails
- Phones
- Certifications
- Languages

---

# Confidence Engine

Confidence is generated independently for every field.

Factors considered:

- Source availability
- Agreement between sources
- Merge outcome

The design is extensible for future source weighting.

---

# Provenance Engine

Every canonical field records its contributing source(s).

Example

```json
{
  "currentCompany": [
    "csv",
    "resume"
  ]
}
```

This enables traceability and auditing.

---

# Validation

The validator performs:

- Required field validation
- Email validation
- Phone validation
- Duplicate removal
- Empty collection handling

---

# Configuration Driven Projection

Projection output is controlled through JSON configuration files.

Example:

```json
{
    "fields": [
        "fullName",
        "emails",
        "skills"
    ],
    "includeConfidence": true,
    "includeProvenance": false
}
```

This allows multiple consumer-specific views without modifying the canonical model.

---

# Generated Outputs

The pipeline produces:

```text
output/

canonicalCandidate.json

recruiterView.json

analyticsView.json

publicProfile.json
```

---

# Edge Cases Handled

| Edge Case | Handling |
|------------|----------|
| Missing Resume | Graceful handling with warning |
| Empty Resume | Validation |
| Invalid Email | Removed during validation |
| Invalid Phone | Removed during validation |
| Duplicate Skills | Deduplicated |
| Duplicate Emails | Deduplicated |
| Duplicate Phones | Deduplicated |
| Duplicate Certifications | Deduplicated |
| Duplicate Languages | Deduplicated |
| Missing Required Fields | Validation error |
| Conflicting Values | Merge strategy applied |

---

# How to Run

## Prerequisites

Before running the project, ensure the following software is installed:

| Requirement | Version |
|-------------|---------|
| Node.js | v18 or later |
| npm | v9 or later |
| Git | Latest |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/Hardekonair/canonical-candidate-profile-engine.git

cd canonical-candidate-profile-engine
```

---

## Step 2: Install Dependencies

Install all required Node.js packages.

```bash
npm install
```

---

## Step 3: Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
GEMINI_API_KEY=<YOUR_gemini_API_KEY>
```


---

## Step 4: Prepare Input Files

Place the required input files inside the `input/` directory.

```
input/
├── recruiter.csv
└── resume.pdf
```

The current implementation expects:

- `input/recruiter.csv`
- `input/resume.pdf`

---

## Step 5: Run the Pipeline

Execute:

```bash
node src/main.js
```

---

## Step 6: Generated Outputs

After successful execution, the pipeline generates:

```
output/
├── canonicalCandidate.json
├── recruiterView.json
├── analyticsView.json
└── publicProfile.json
```

These files contain the transformed candidate data in different consumer-specific views.

# Sample Console Output

```text
==================================================
 Canonical Candidate Profile Engine
==================================================

✓ Recruiter CSV Parsed
✓ Recruiter Candidates Extracted
✓ Resume Parsed
✓ Resume Candidate Extracted
✓ Candidate Matched
✓ Canonical Candidate Created
✓ Provenance Generated
✓ Confidence Generated
✓ Validation Passed
✓ Projection Files Generated
✓ Output Files Saved

==================================================
 Pipeline Completed Successfully
==================================================
```

# Sample Canonical Candidate Output

```json
{
  "candidateId": "C001",
  "fullName": "Hardik Saxena",
  "emails": [
    "hardik.saxena@gmail.com"
  ],
  "phones": [
    "+919876543210"
  ],
  "currentCompany": "Google",
  "currentTitle": "Software Engineer",
  "skills": [
    "C++",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],
  "location": "Greater Noida, Uttar Pradesh, India",
  "confidence": {
    "fullName": 1.0,
    "emails": 1.0,
    "phones": 1.0
  },
  "provenance": {
    "fullName": ["csv", "resume"],
    "emails": ["csv", "resume"],
    "phones": ["csv", "resume"]
  }
}
```


# Output Files

| File                     | Description                                                         |
|--------------------------|---------------------------------------------------------------------|
| canonicalCandidate.json  | Complete canonical candidate profile with confidence and provenance |
| recruiterView.json       | Recruiter-focused projection                                        |
| analyticsView.json       | Analytics-oriented projection                                       |
| publicProfile.json       | Public profile projection                                           |

---

# Future Improvements

- ATS Integration
- LinkedIn Integration
- GitHub Integration
- OCR Support for Scanned Resumes
- Semantic Skill Normalization
- REST API
- Database Persistence
- Batch Resume Processing
- Parallel Processing
- Source Reliability Weighting

---

# Assignment Deliverables

- ✅ Technical Design
- ✅ Canonical Candidate Model
- ✅ CSV Parser
- ✅ Resume Parser
- ✅ Gemini LLM Resume Extraction
- ✅ Candidate Matcher
- ✅ Profile Merger
- ✅ Provenance Engine
- ✅ Confidence Engine
- ✅ Schema Validator
- ✅ Configuration Driven Projection
- ✅ JSON Output Generation

---

## Repository

This project was developed as part of the **Eightfold Engineering Internship Assignment** demonstrating the design and implementation of a modular **Canonical Candidate Profile Engine**.

