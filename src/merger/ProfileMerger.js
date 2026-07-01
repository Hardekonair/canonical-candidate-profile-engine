import Candidate from "../models/Candidate.js";

class ProfileMerger {

    /**
     * Merge two primitive values.
     * Preference:
     * Resume -> CSV -> Default
     */
    mergePrimitive(csvValue, resumeValue, defaultValue = "") {

        if (
            resumeValue !== undefined &&
            resumeValue !== null &&
            resumeValue !== ""
        ) {
            return resumeValue;
        }

        if (
            csvValue !== undefined &&
            csvValue !== null &&
            csvValue !== ""
        ) {
            return csvValue;
        }

        return defaultValue;
    }

    /**
     * Merge two arrays and remove duplicates.
     */
    mergeArray(csvArray = [], resumeArray = []) {

        return [...new Set([
            ...csvArray,
            ...resumeArray
        ])];

    }

    /**
     * Merge two objects.
     * Resume values override CSV values.
     */
    mergeObject(csvObject = {}, resumeObject = {}) {

        return {

            ...csvObject,

            ...resumeObject

        };

    }

    /**
     * Merge entire candidate profile.
     */
    merge(csvCandidate, resumeCandidate) {

        if (!csvCandidate && !resumeCandidate) {

            throw new Error(
                "No candidate data provided."
            );

        }

        const canonicalCandidate = new Candidate({

            candidateId:
                csvCandidate?.candidateId || null,

            fullName:
                this.mergePrimitive(
                    csvCandidate?.fullName,
                    resumeCandidate?.fullName
                ),

            emails:
                this.mergeArray(
                    csvCandidate?.emails,
                    resumeCandidate?.emails
                ),

            phones:
                this.mergeArray(
                    csvCandidate?.phones,
                    resumeCandidate?.phones
                ),

            currentCompany:
                this.mergePrimitive(
                    csvCandidate?.currentCompany,
                    resumeCandidate?.currentCompany
                ),

            currentTitle:
                this.mergePrimitive(
                    csvCandidate?.currentTitle,
                    resumeCandidate?.currentTitle
                ),

            location:
                this.mergePrimitive(
                    csvCandidate?.location,
                    resumeCandidate?.location
                ),

            summary:
                this.mergePrimitive(
                    csvCandidate?.summary,
                    resumeCandidate?.summary
                ),

            skills:
                this.mergeArray(
                    csvCandidate?.skills,
                    resumeCandidate?.skills
                ),

            education:
                this.mergeArray(
                    csvCandidate?.education,
                    resumeCandidate?.education
                ),

            experience:
                this.mergeArray(
                    csvCandidate?.experience,
                    resumeCandidate?.experience
                ),

        });

        /*
        ============================================
        Merge Extra Fields
        ============================================
        */

        canonicalCandidate.projects =
            this.mergeArray(
                csvCandidate?.projects,
                resumeCandidate?.projects
            );

        canonicalCandidate.certifications =
            this.mergeArray(
                csvCandidate?.certifications,
                resumeCandidate?.certifications
            );

        canonicalCandidate.languages =
            this.mergeArray(
                csvCandidate?.languages,
                resumeCandidate?.languages
            );

        canonicalCandidate.links =
            this.mergeObject(
                csvCandidate?.links,
                resumeCandidate?.links
            );

        /*
        ============================================
        Placeholder
        ============================================
        */

        canonicalCandidate.confidence = {};

        canonicalCandidate.provenance = {};

        return canonicalCandidate;

    }

}

export default new ProfileMerger();