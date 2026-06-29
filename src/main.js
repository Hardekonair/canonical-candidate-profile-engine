import CSVParser from "./parsers/CSVParser.js";

async function main() {

    try {

        const parser = new CSVParser();

        const candidates =
            await parser.parse("./input/recruiter.csv");

        console.log(candidates);

    }

    catch (error) {

        console.error(error.message);

    }

}

main();