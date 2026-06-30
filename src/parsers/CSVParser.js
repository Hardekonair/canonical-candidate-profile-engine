import fs from "fs";
import csv from "csv-parser";

import BaseParser from "./BaseParser.js";

class CSVParser extends BaseParser {

    async parse(filePath) {

        return new Promise((resolve, reject) => {

            const rows = [];

            fs.createReadStream(filePath)

                .pipe(csv())

                .on("data", (row) => {

                    rows.push(row);

                })

                .on("end", () => {

                    resolve(rows);

                })

                .on("error", (error) => {

                    reject(
                        new Error(
                            `CSV Parsing Failed: ${error.message}`
                        )
                    );

                });

        });

    }

}

export default CSVParser;