import fs from "fs";
import csv from "csv-parser";

import BaseParser from "./BaseParser.js";
import Candidate from "../models/Candidate.js";

class CSVParser extends BaseParser {

    async parse(filePath) {

        return new Promise((resolve, reject) => {

            const candidates = [];

            fs.createReadStream(filePath)

                .pipe(csv())

                .on("data", (row) => {

                    const candidate = new Candidate({

                        candidateId: row.candidate_id,

                        fullName: row.name,

                        emails: row.email
                            ? [row.email]
                            : [],

                        phones: row.phone
                            ? [row.phone]
                            : [],

                        currentCompany:
                            row.current_company || "",

                        currentTitle:
                            row.current_title || ""

                    });

                    candidates.push(candidate);

                })

                .on("end", () => {

                    resolve(candidates);

                })

                .on("error", (err) => {

                    reject(err);

                });

        });

    }

}

export default CSVParser;