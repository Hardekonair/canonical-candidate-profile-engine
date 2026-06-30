import RegexPatterns from "../helpers/RegexPatterns.js";

class EmailExtractor {

    extract(text) {

        const emails = text.match(RegexPatterns.EMAIL);

        return emails
            ? [...new Set(emails)]
            : [];

    }

}

export default new EmailExtractor();