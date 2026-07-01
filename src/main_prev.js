import CSVParser from "./parsers/CSVParser.js";
import ResumeParser from "./parsers/ResumeParser.js";

import CSVExtractor from "./extractors/CSVExtractor.js";
import ResumeExtractor from "./extractors/ResumeExtractor.js";
import ProfileMerger from "./merger/ProfileMerger.js";
import CandidateMatcher from "./matcher/CandidateMatcher.js";
import ProvenanceEngine from "./provenance/ProvenanceEngine.js";
import ConfidenceEngine from "./confidence/ConfidenceEngine.js";
import SchemaValidator from "./validator/SchemaValidator.js";
import ProjectionEngine from "./projection/ProjectionEngine.js";
import FileWriter from "./utils/FileWriter.js";
import EdgeCaseHandler from "./edgecases/EdgeCaseHandler.js";

async function main() {

    try {

        console.log("\n==============================");
        console.log(" Canonical Candidate Pipeline ");
        console.log("==============================\n");

        /*
        ===================================================
        STEP 1 : Parse Recruiter CSV
        ===================================================
        */

        const csvParser = new CSVParser();

        const rawCSVRows = await csvParser.parse(
            "./input/recruiter.csv"
        );

        console.log("✔ Recruiter CSV Parsed\n");

        console.dir(rawCSVRows, {
            depth: null
        });

        /*
        ===================================================
        STEP 2 : Convert CSV -> Candidate[]
        ===================================================
        */

        const csvExtractor = new CSVExtractor();

        const recruiterCandidates =
            csvExtractor.extract(rawCSVRows);

        console.log("\n✔ CSV Extracted Successfully\n");

        console.dir(recruiterCandidates, {
            depth: null
        });

        /*
        ===================================================
        STEP 3 : Parse Resume PDF
        ===================================================
        */

        const resumeParser = new ResumeParser();

        let resumeText = "";

        try {

            resumeText =
                await resumeParser.parse(
                    "./input/resume.pdf"
                );

        }

        catch (error) {

            console.warn(
                "⚠ Resume parsing failed."
            );

        }

        resumeText =
            EdgeCaseHandler.handleMissingResume(
                resumeText
            );

        console.log("\n✔ Resume Parsed Successfully\n");

        console.log(resumeText);

        /*
        ===================================================
        STEP 4 : Resume -> Candidate
        ===================================================
        */

        const resumeCandidate =
            await ResumeExtractor.extract(resumeText);

        if (
            !EdgeCaseHandler.handleResumeCandidate(
                resumeCandidate
            )
        ) {

            return;

        }

        console.log("\n✔ Resume Extracted Successfully\n");

        console.dir(resumeCandidate, {
            depth: null
        });

        /*
        ====================================
        STEP 5 : Merge Candidate Profiles
        ====================================
        */

        // const canonicalCandidate =
        //     ProfileMerger.merge(

        //         recruiterCandidates[0],

        //         resumeCandidate

        //     );

        // console.log("\n✔ Canonical Candidate Created\n");

        // console.dir(canonicalCandidate, {
        //     depth: null
        // });
        /*
        ==================================================
        STEP 5 : Match Candidate
        ==================================================
        */

        EdgeCaseHandler.sanitize(
            resumeCandidate
        );

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

        console.log("\n========================================");
        console.log(" STEP 5 : MATCHED CANDIDATE ");
        console.log("========================================\n");

        console.dir(matchedCandidate, {
            depth: null
        });

        /*
        ==================================================
        STEP 6 : Merge Candidate Profiles
        ==================================================
        */

        const canonicalCandidate = ProfileMerger.merge(
            matchedCandidate,
            resumeCandidate
        );

        EdgeCaseHandler.sanitize(
            canonicalCandidate
        );

        console.log("\n========================================");
        console.log(" STEP 6 : CANONICAL CANDIDATE ");
        console.log("========================================\n");

        console.dir(canonicalCandidate, {
            depth: null
        });


        /*
        ==================================================
        STEP 7 : Generate Provenance
        ==================================================
        */

        ProvenanceEngine.generate(
            matchedCandidate,
            resumeCandidate,
            canonicalCandidate
        );

        console.log("\n========================================");
        console.log(" STEP 7 : PROVENANCE ");
        console.log("========================================\n");

        console.dir(canonicalCandidate.provenance, {
            depth: null
        });

        /*
        ==================================================
        STEP 8 : Generate Confidence
        ==================================================
        */

        ConfidenceEngine.generate(
            matchedCandidate,
            resumeCandidate,
            canonicalCandidate
        );

        console.log("\n========================================");
        console.log(" STEP 8 : CONFIDENCE ");
        console.log("========================================\n");

        console.dir(canonicalCandidate.confidence, {
            depth: null
        });

        console.log("\n========================================");
        console.log(" FINAL CANONICAL CANDIDATE ");
        console.log("========================================\n");

        console.dir(canonicalCandidate, {
            depth: null
        });


        /*
        ==================================================
        STEP 9 : Validate Canonical Candidate
        ==================================================
        */

        const validation =
            SchemaValidator.validate(
                canonicalCandidate
            );

        console.log("\n========================================");
        console.log(" STEP 9 : VALIDATION ");
        console.log("========================================\n");

        console.dir(validation, {
            depth: null
        });

        if (!validation.valid) {

            throw new Error(
                "Canonical Candidate Validation Failed."
            );

        }

        /*
        ==================================================
        STEP 10 : Projection Engine
        ==================================================
        */

        console.log("\n========================================");
        console.log(" STEP 10 : PROJECTIONS ");
        console.log("========================================\n");

        const recruiterView =
            ProjectionEngine.recruiter(
                canonicalCandidate
            );

        const analyticsView =
            ProjectionEngine.analytics(
                canonicalCandidate
            );

        const publicProfile =
            ProjectionEngine.publicProfile(
                canonicalCandidate
            );

        console.log("\nRecruiter View\n");

        console.dir(recruiterView, {
            depth: null
        });

        console.log("\nAnalytics View\n");

        console.dir(analyticsView, {
            depth: null
        });

        console.log("\nPublic Profile\n");

        console.dir(publicProfile, {
            depth: null
        });


        /*
        ==================================================
        STEP 11 : SAVE OUTPUT FILES
        ==================================================
        */

        console.log("\n========================================");
        console.log(" STEP 11 : SAVING OUTPUT FILES ");
        console.log("========================================\n");

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
        /*
        ===================================================
        NEXT PHASES
        ===================================================
        */

        console.log("\n-----------------------------------");
        console.log("NEXT PIPELINE STAGES");
        console.log("-----------------------------------");

        console.log("⏳ Profile Merger");
        console.log("⏳ Confidence Engine");
        console.log("⏳ Provenance Engine");
        console.log("⏳ Projection Engine");
        console.log("⏳ Schema Validator");

    }

    catch (error) {

        console.error("\n❌ Pipeline Failed\n");

        console.error(error);

    }

}

main();