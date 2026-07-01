class EdgeCaseHandler {

    /*
    =====================================
    Resume Missing
    =====================================
    */

    static handleMissingResume(text) {

        if (!text || !text.trim()) {

            console.warn("⚠ Resume is empty.");

            return "";

        }

        return text;

    }

    /*
    =====================================
    Resume Extraction Failed
    =====================================
    */

    static handleResumeCandidate(candidate) {

        if (!candidate) {

            console.warn("⚠ Resume extraction failed.");

            return false;

        }

        return true;

    }

    /*
    =====================================
    Remove Invalid Emails
    =====================================
    */

    static cleanEmails(candidate) {

        if (!candidate.emails) return;

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        candidate.emails =
            candidate.emails.filter(email =>
                regex.test(email)
            );

    }

    /*
    =====================================
    Remove Invalid Phones
    =====================================
    */

    static cleanPhones(candidate) {

        if (!candidate.phones) return;

        const regex =
            /^\+\d{10,15}$/;

        candidate.phones =
            candidate.phones.filter(phone =>
                regex.test(phone)
            );

    }

    /*
    =====================================
    Remove Duplicate Skills
    =====================================
    */

    static cleanSkills(candidate) {

        if (!candidate.skills) {

            candidate.skills = [];

            return;

        }

        candidate.skills =
            [...new Set(candidate.skills)];

    }

    /*
    =====================================
    Replace Undefined Arrays
    =====================================
    */

    static ensureArrays(candidate) {

        candidate.skills ??= [];

        candidate.education ??= [];

        candidate.experience ??= [];

        candidate.projects ??= [];

        candidate.certifications ??= [];

        candidate.languages ??= [];

        candidate.emails ??= [];

        candidate.phones ??= [];

    }

    /*
    =====================================
    Complete Cleanup
    =====================================
    */

    static sanitize(candidate) {

        this.ensureArrays(candidate);

        this.cleanEmails(candidate);

        this.cleanPhones(candidate);

        this.cleanSkills(candidate);

    }

}

export default EdgeCaseHandler;