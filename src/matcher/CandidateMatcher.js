class CandidateMatcher {

    /*
    ======================================================
    Normalize String
    ======================================================
    */

    normalize(value = "") {

        return value
            .toString()
            .trim()
            .toLowerCase();

    }

    /*
    ======================================================
    Compare Arrays
    ======================================================
    */

    hasCommonValue(array1 = [], array2 = []) {

        const set = new Set(
            array1.map(value => this.normalize(value))
        );

        return array2.some(value =>
            set.has(this.normalize(value))
        );

    }

    /*
    ======================================================
    Match By Email
    ======================================================
    */

    matchByEmail(csvCandidate, resumeCandidate) {

        return this.hasCommonValue(
            csvCandidate.emails,
            resumeCandidate.emails
        );

    }

    /*
    ======================================================
    Match By Phone
    ======================================================
    */

    matchByPhone(csvCandidate, resumeCandidate) {

        return this.hasCommonValue(
            csvCandidate.phones,
            resumeCandidate.phones
        );

    }

    /*
    ======================================================
    Match By Candidate ID
    ======================================================
    */

    matchByCandidateId(csvCandidate, resumeCandidate) {

        if (
            !csvCandidate.candidateId ||
            !resumeCandidate.candidateId
        ) {
            return false;
        }

        return (
            this.normalize(csvCandidate.candidateId) ===
            this.normalize(resumeCandidate.candidateId)
        );

    }

    /*
    ======================================================
    Match By Name
    ======================================================
    */

    matchByName(csvCandidate, resumeCandidate) {

        if (
            !csvCandidate.fullName ||
            !resumeCandidate.fullName
        ) {
            return false;
        }

        return (
            this.normalize(csvCandidate.fullName) ===
            this.normalize(resumeCandidate.fullName)
        );

    }

    /*
    ======================================================
    Calculate Matching Score
    ======================================================
    */

    calculateScore(csvCandidate, resumeCandidate) {

        let score = 0;

        if (this.matchByCandidateId(csvCandidate, resumeCandidate))
            score += 100;

        if (this.matchByEmail(csvCandidate, resumeCandidate))
            score += 60;

        if (this.matchByPhone(csvCandidate, resumeCandidate))
            score += 30;

        if (this.matchByName(csvCandidate, resumeCandidate))
            score += 10;

        return score;

    }

    /*
    ======================================================
    Find Best Candidate
    ======================================================
    */

    find(candidates = [], resumeCandidate) {

        if (!Array.isArray(candidates)) {

            throw new Error(
                "Candidates must be an array."
            );

        }

        if (!resumeCandidate) {

            throw new Error(
                "Resume candidate is required."
            );

        }

        let bestCandidate = null;

        let highestScore = -1;

        for (const candidate of candidates) {

            const score = this.calculateScore(
                candidate,
                resumeCandidate
            );

            if (score > highestScore) {

                highestScore = score;

                bestCandidate = candidate;

            }

        }

        if (highestScore <= 0) {

            return null;

        }

        return bestCandidate;

    }

}

export default new CandidateMatcher();