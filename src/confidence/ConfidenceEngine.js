class ConfidenceEngine {

    /*
    ==========================================
    Check if value exists
    ==========================================
    */

    exists(value) {

        if (value === null || value === undefined)
            return false;

        if (typeof value === "string")
            return value.trim() !== "";

        if (Array.isArray(value))
            return value.length > 0;

        if (typeof value === "object")
            return Object.keys(value).length > 0;

        return true;

    }

    /*
    ==========================================
    Normalize value before comparison
    ==========================================
    */

    normalize(value) {

        if (Array.isArray(value)) {

            return [...value]
                .map(v => String(v).trim().toLowerCase())
                .sort()
                .join("|");

        }

        if (typeof value === "object") {

            return JSON.stringify(value);

        }

        return String(value)
            .trim()
            .toLowerCase();

    }

    /*
    ==========================================
    Calculate score
    ==========================================
    */

    calculate(csvValue, resumeValue) {

        const csvExists = this.exists(csvValue);

        const resumeExists = this.exists(resumeValue);

        if (!csvExists && !resumeExists)
            return 0.0;

        if (csvExists && !resumeExists)
            return 0.80;

        if (!csvExists && resumeExists)
            return 0.90;

        const csvNormalized =
            this.normalize(csvValue);

        const resumeNormalized =
            this.normalize(resumeValue);

        if (csvNormalized === resumeNormalized)
            return 1.0;

        return 0.50;

    }

    /*
    ==========================================
    Generate confidence
    ==========================================
    */

    generate(csvCandidate,
             resumeCandidate,
             canonicalCandidate) {

        canonicalCandidate.confidence = {

            candidateId:
                this.calculate(
                    csvCandidate?.candidateId,
                    resumeCandidate?.candidateId
                ),

            fullName:
                this.calculate(
                    csvCandidate?.fullName,
                    resumeCandidate?.fullName
                ),

            emails:
                this.calculate(
                    csvCandidate?.emails,
                    resumeCandidate?.emails
                ),

            phones:
                this.calculate(
                    csvCandidate?.phones,
                    resumeCandidate?.phones
                ),

            currentCompany:
                this.calculate(
                    csvCandidate?.currentCompany,
                    resumeCandidate?.currentCompany
                ),

            currentTitle:
                this.calculate(
                    csvCandidate?.currentTitle,
                    resumeCandidate?.currentTitle
                ),

            location:
                this.calculate(
                    csvCandidate?.location,
                    resumeCandidate?.location
                ),

            summary:
                this.calculate(
                    csvCandidate?.summary,
                    resumeCandidate?.summary
                ),

            skills:
                this.calculate(
                    csvCandidate?.skills,
                    resumeCandidate?.skills
                ),

            education:
                this.calculate(
                    csvCandidate?.education,
                    resumeCandidate?.education
                ),

            experience:
                this.calculate(
                    csvCandidate?.experience,
                    resumeCandidate?.experience
                ),

            projects:
                this.calculate(
                    csvCandidate?.projects,
                    resumeCandidate?.projects
                ),

            certifications:
                this.calculate(
                    csvCandidate?.certifications,
                    resumeCandidate?.certifications
                ),

            languages:
                this.calculate(
                    csvCandidate?.languages,
                    resumeCandidate?.languages
                ),

            links:
                this.calculate(
                    csvCandidate?.links,
                    resumeCandidate?.links
                )

        };

        return canonicalCandidate;

    }

}

export default new ConfidenceEngine();