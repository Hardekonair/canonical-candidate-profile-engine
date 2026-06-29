/**
 * Canonical Candidate Profile
 *
 * Every parser (CSV, Resume PDF, LinkedIn, ATS, etc.)
 * converts its source into this common representation.
 *
 * This class DOES NOT:
 * - Parse files
 * - Normalize data
 * - Merge profiles
 * - Calculate confidence
 *
 * It only represents candidate data.
 */

class Candidate {
    constructor({
        candidateId = null,
        fullName = "",

        emails = [],
        phones = [],

        currentCompany = "",
        currentTitle = "",

        skills = [],
        education = [],
        experience = [],

        location = "",

        summary = ""
    } = {}) {

        // -------------------------
        // Identity
        // -------------------------

        this.candidateId = candidateId;
        this.fullName = fullName;

        // -------------------------
        // Contact
        // -------------------------

        this.emails = emails;
        this.phones = phones;

        // -------------------------
        // Current Employment
        // -------------------------

        this.currentCompany = currentCompany;
        this.currentTitle = currentTitle;

        // -------------------------
        // Professional Information
        // -------------------------

        this.skills = skills;
        this.education = education;
        this.experience = experience;

        // -------------------------
        // Additional Information
        // -------------------------

        this.location = location;
        this.summary = summary;

        // -------------------------
        // Metadata
        // (Filled by later pipeline stages)
        // -------------------------

        this.confidence = {};

        this.provenance = {};
    }
}

export default Candidate;