class TextPreprocessor {

    clean(text) {

        if (!text) return "";

        let cleaned = text;

        // Windows -> Unix
        cleaned = cleaned.replace(/\r/g, "\n");

        // Multiple spaces
        cleaned = cleaned.replace(/[ \t]+/g, " ");

        // Remove long separators
        cleaned = cleaned.replace(/[-_=]{3,}/g, "");

        // Put important labels on new lines
        const labels = [

            "Email:",
            "Phone:",
            "Mobile:",
            "LinkedIn:",
            "Github:",
            "GitHub:",
            "Location:",

            "SUMMARY",
            "PROFILE",
            "ABOUT",

            "SKILLS",

            "TECHNICAL SKILLS",

            "EDUCATION",

            "EXPERIENCE",

            "WORK EXPERIENCE",

            "PROJECTS",

            "CERTIFICATIONS",

            "ACHIEVEMENTS",

            "LANGUAGES"

        ];

        labels.forEach(label => {

            const regex = new RegExp(label, "gi");

            cleaned = cleaned.replace(regex, `\n${label}`);

        });

        // Remove multiple blank lines
        cleaned = cleaned.replace(/\n{2,}/g, "\n");

        return cleaned.trim();

    }

}

export default new TextPreprocessor();