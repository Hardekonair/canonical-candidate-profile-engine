class NameExtractor {

    extract(text) {

        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        for (const line of lines) {

            // Stop once contact section starts
            if (/^(Email:|Phone:|Mobile:|LinkedIn:|GitHub:|Location:)/i.test(line))
                break;

            // Ignore common headings
            if (/^(SUMMARY|PROFILE|ABOUT|SKILLS|EXPERIENCE|EDUCATION|PROJECTS)/i.test(line))
                continue;

            // Ignore long descriptive sentences
            if (line.split(" ").length > 5)
                continue;

            // Ignore URLs
            if (line.includes("http"))
                continue;

            return line;

        }

        return "";

    }

}

export default new NameExtractor();