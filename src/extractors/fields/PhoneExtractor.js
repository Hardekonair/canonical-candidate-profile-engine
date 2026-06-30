import RegexPatterns from "../helpers/RegexPatterns.js";

class PhoneExtractor {

    extract(text) {

        const phones = text.match(RegexPatterns.PHONE);

        return phones
            ? [...new Set(
                phones.map(phone => phone.trim())
            )]
            : [];

    }

}

export default new PhoneExtractor();