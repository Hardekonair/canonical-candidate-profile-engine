import CSVParser from "./parsers/CSVParser.js";
import ResumeParser from "./parsers/ResumeParser.js";

import CSVExtractor from "./extractors/CSVExtractor.js";
import ResumeExtractor from "./extractors/ResumeExtractor.js";

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

        const resumeText = await resumeParser.parse(
            "./input/resume.pdf"
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

        console.log("\n✔ Resume Extracted Successfully\n");

        console.dir(resumeCandidate, {
            depth: null
        });

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