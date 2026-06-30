import fs from "fs/promises";
import PDFParser from "pdf2json";

import BaseParser from "./BaseParser.js";

class ResumeParser extends BaseParser {

    async parse(filePath) {

        const pdfParser = new PDFParser();

        return new Promise(async (resolve, reject) => {

            pdfParser.on("pdfParser_dataError", err => {
                reject(new Error(err.parserError));
            });

            pdfParser.on("pdfParser_dataReady", pdfData => {

                let text = "";

                pdfData.Pages.forEach(page => {

                    page.Texts.forEach(item => {

                        item.R.forEach(run => {

                            text += decodeURIComponent(run.T) + " ";

                        });

                    });

                    text += "\n";

                });

                resolve(text);

            });

            pdfParser.loadPDF(filePath);

        });

    }

}

export default ResumeParser;