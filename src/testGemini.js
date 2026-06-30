import fs from "fs/promises";

import ResumeParser from "./parsers/ResumeParser.js";
import GeminiExtractor from "./llm/GeminiExtractor.js";

async function test() {

    const parser = new ResumeParser();

    const text = await parser.parse("./input/resume.pdf");

    const data = await GeminiExtractor.extract(text);

    console.dir(data, {
        depth: null
    });

}

test();