class ProvenanceEngine {

    /*
    ===========================================
    Check if field exists
    ===========================================
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
    ===========================================
    Determine sources for a field
    ===========================================
    */

    determineSources(csvValue, resumeValue) {

        const result = {

            sources: []

        };

        if (this.exists(csvValue))
            result.sources.push("csv");

        if (this.exists(resumeValue))
            result.sources.push("resume");

        return result;

    }

    /*
    ===========================================
    Generate provenance
    ===========================================
    */

    generate(csvCandidate, resumeCandidate, canonicalCandidate) {

        canonicalCandidate.provenance = {

            candidateId:
                this.determineSources(
                    csvCandidate?.candidateId,
                    resumeCandidate?.candidateId
                ),

            fullName:
                this.determineSources(
                    csvCandidate?.fullName,
                    resumeCandidate?.fullName
                ),

            emails:
                this.determineSources(
                    csvCandidate?.emails,
                    resumeCandidate?.emails
                ),

            phones:
                this.determineSources(
                    csvCandidate?.phones,
                    resumeCandidate?.phones
                ),

            currentCompany:
                this.determineSources(
                    csvCandidate?.currentCompany,
                    resumeCandidate?.currentCompany
                ),

            currentTitle:
                this.determineSources(
                    csvCandidate?.currentTitle,
                    resumeCandidate?.currentTitle
                ),

            location:
                this.determineSources(
                    csvCandidate?.location,
                    resumeCandidate?.location
                ),

            summary:
                this.determineSources(
                    csvCandidate?.summary,
                    resumeCandidate?.summary
                ),

            skills:
                this.determineSources(
                    csvCandidate?.skills,
                    resumeCandidate?.skills
                ),

            education:
                this.determineSources(
                    csvCandidate?.education,
                    resumeCandidate?.education
                ),

            experience:
                this.determineSources(
                    csvCandidate?.experience,
                    resumeCandidate?.experience
                ),

            projects:
                this.determineSources(
                    csvCandidate?.projects,
                    resumeCandidate?.projects
                ),

            certifications:
                this.determineSources(
                    csvCandidate?.certifications,
                    resumeCandidate?.certifications
                ),

            languages:
                this.determineSources(
                    csvCandidate?.languages,
                    resumeCandidate?.languages
                ),

            links:
                this.determineSources(
                    csvCandidate?.links,
                    resumeCandidate?.links
                )

        };

        return canonicalCandidate;

    }

}

export default new ProvenanceEngine();