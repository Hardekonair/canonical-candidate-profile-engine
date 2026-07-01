import fs from "fs";

class ProjectionEngine {

    /**
     * Generate projection based on config file.
     *
     * @param {Candidate} candidate
     * @param {string} configPath
     * @returns {Object}
     */
    generate(candidate, configPath) {

        const config = JSON.parse(

            fs.readFileSync(configPath, "utf-8")

        );

        const output = {};

        /*
        =====================================
        Include Selected Fields
        =====================================
        */

        for (const field of config.fields) {

            output[field] = candidate[field];

        }

        /*
        =====================================
        Confidence
        =====================================
        */

        if (config.includeConfidence) {

            output.confidence =
                candidate.confidence;

        }

        /*
        =====================================
        Provenance
        =====================================
        */

        if (config.includeProvenance) {

            output.provenance =
                candidate.provenance;

        }

        return output;

    }

}

export default new ProjectionEngine();