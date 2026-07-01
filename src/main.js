import CSVParser from "./parsers/CSVParser.js";
import ResumeParser from "./parsers/ResumeParser.js";

import CSVExtractor from "./extractors/CSVExtractor.js";
import ResumeExtractor from "./extractors/ResumeExtractor.js";

import CandidateMatcher from "./matcher/CandidateMatcher.js";
import ProfileMerger from "./merger/ProfileMerger.js";

import ProvenanceEngine from "./provenance/ProvenanceEngine.js";
import ConfidenceEngine from "./confidence/ConfidenceEngine.js";

import SchemaValidator from "./validator/SchemaValidator.js";
import ProjectionEngine from "./projection/ProjectionEngine.js";

import EdgeCaseHandler from "./edgecases/EdgeCaseHandler.js";
import FileWriter from "./utils/FileWriter.js";

async function main() {

    console.log("\n==================================================");
    console.log(" Canonical Candidate Profile Engine");
    console.log("==================================================");

    try {

        /*
        ============================================
        STEP 1 : Parse Recruiter CSV
        ============================================
        */

        const csvParser = new CSVParser();

        const rawCSVRows =
            await csvParser.parse("./input/recruiter.csv");

        console.log("✓ Recruiter CSV Parsed");

        /*
        ============================================
        STEP 2 : Extract Recruiter Candidates
        ============================================
        */

        const csvExtractor = new CSVExtractor();

        const recruiterCandidates =
            csvExtractor.extract(rawCSVRows);

        console.log("✓ Recruiter Candidates Extracted");

        /*
        ============================================
        STEP 3 : Parse Resume
        ============================================
        */

        const resumeParser = new ResumeParser();

        let resumeText = "";

        try {

            resumeText =
                await resumeParser.parse("./input/resume.pdf");

        }

        catch {

            console.warn("⚠ Unable to parse resume.");

        }

        resumeText =
            EdgeCaseHandler.handleMissingResume(
                resumeText
            );

        console.log("✓ Resume Parsed");

        /*
        ============================================
        STEP 4 : Extract Resume Candidate
        ============================================
        */

        const resumeCandidate =
            await ResumeExtractor.extract(
                resumeText
            );

        if (
            !EdgeCaseHandler.handleResumeCandidate(
                resumeCandidate
            )
        ) {

            console.error(
                "✖ Resume extraction failed."
            );

            return;

        }

        EdgeCaseHandler.sanitize(
            resumeCandidate
        );

        console.log("✓ Resume Candidate Extracted");

        /*
        ============================================
        STEP 5 : Candidate Matching
        ============================================
        */

        const matchedCandidate =
            CandidateMatcher.find(
                recruiterCandidates,
                resumeCandidate
            );

        if (!matchedCandidate) {

            throw new Error(
                "No matching recruiter candidate found."
            );

        }

        console.log("✓ Candidate Matched");

        /*
        ============================================
        STEP 6 : Profile Merge
        ============================================
        */

        const canonicalCandidate =
            ProfileMerger.merge(
                matchedCandidate,
                resumeCandidate
            );

        EdgeCaseHandler.sanitize(
            canonicalCandidate
        );

        console.log("✓ Canonical Candidate Created");

        /*
        ============================================
        STEP 7 : Provenance
        ============================================
        */

        ProvenanceEngine.generate(
            matchedCandidate,
            resumeCandidate,
            canonicalCandidate
        );

        console.log("✓ Provenance Generated");

        /*
        ============================================
        STEP 8 : Confidence
        ============================================
        */

        ConfidenceEngine.generate(
            matchedCandidate,
            resumeCandidate,
            canonicalCandidate
        );

        console.log("✓ Confidence Generated");

        /*
        ============================================
        STEP 9 : Validation
        ============================================
        */

        const validation =
            SchemaValidator.validate(
                canonicalCandidate
            );

        if (!validation.valid) {

            console.log("\nValidation Errors:");

            validation.errors.forEach(error =>
                console.log(`• ${error}`)
            );

            throw new Error(
                "Validation failed."
            );

        }

        if (validation.warnings?.length) {

            console.log("\nValidation Warnings:");

            validation.warnings.forEach(warning =>
                console.log(`• ${warning}`)
            );

        }

        console.log("✓ Validation Passed");

        /*
        ============================================
        STEP 10 : Generate Projections
        ============================================
        */

        const recruiterView =
            ProjectionEngine.generate(
                canonicalCandidate,
                "./src/config/recruiter.json"
            );

        const analyticsView =
            ProjectionEngine.generate(
                canonicalCandidate,
                "./src/config/analytics.json"
            );

        const publicProfile =
            ProjectionEngine.generate(
                canonicalCandidate,
                "./src/config/public.json"
            );

        console.log("✓ Projection Files Generated");

        /*
        ============================================
        STEP 11 : Save Output Files
        ============================================
        */

        FileWriter.write(
            "canonicalCandidate.json",
            canonicalCandidate
        );

        FileWriter.write(
            "recruiterView.json",
            recruiterView
        );

        FileWriter.write(
            "analyticsView.json",
            analyticsView
        );

        FileWriter.write(
            "publicProfile.json",
            publicProfile
        );

        console.log("✓ Output Files Saved");

        /*
        ============================================
        PIPELINE SUMMARY
        ============================================
        */

        console.log("\n==================================================");
        console.log(" Pipeline Completed Successfully");
        console.log("==================================================");

        console.log("\nGenerated Files:");

        console.log("• output/canonicalCandidate.json");
        console.log("• output/recruiterView.json");
        console.log("• output/analyticsView.json");
        console.log("• output/publicProfile.json");

    }

    catch (error) {

        console.log("\n==================================================");
        console.log(" Pipeline Failed");
        console.log("==================================================");

        console.error(error.message);

    }

}

main();