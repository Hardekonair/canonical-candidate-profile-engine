class PhoneNormalizer {

    normalize(phone) {

        if (!phone) return "";

        return phone

            // Remove spaces
            .replace(/\s+/g, "")

            // Remove dashes
            .replace(/-/g, "")

            // Remove brackets
            .replace(/[()]/g, "")

            // Trim
            .trim();

    }

    normalizeArray(phones = []) {

        return phones.map(phone => this.normalize(phone));

    }

}

export default new PhoneNormalizer();