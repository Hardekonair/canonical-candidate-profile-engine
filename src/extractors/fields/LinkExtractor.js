import RegexPatterns from "../helpers/RegexPatterns.js";

class LinkExtractor {

    extract(text) {

        return {

            github:
                text.match(RegexPatterns.GITHUB)?.[0] || "",

            linkedin:
                text.match(RegexPatterns.LINKEDIN)?.[0] || "",

            website:
                text.match(RegexPatterns.WEBSITE)?.[0] || ""

        };

    }

}

export default new LinkExtractor();