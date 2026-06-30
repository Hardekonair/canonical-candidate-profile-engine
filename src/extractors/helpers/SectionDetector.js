class SectionDetector {

    detect(text) {

        const sectionNames = [

            "SUMMARY",
            "PROFILE",
            "ABOUT",

            "SKILLS",
            "TECHNICAL SKILLS",

            "EXPERIENCE",
            "WORK EXPERIENCE",

            "EDUCATION",

            "PROJECTS",

            "CERTIFICATIONS",

            "ACHIEVEMENTS",

            "LANGUAGES"

        ];

        const sections = {

            header: ""

        };

        let current = "header";

        const lines = text.split("\n");

        for (const line of lines) {

            const trimmed = line.trim();

            const matched = sectionNames.find(section =>

                trimmed.toUpperCase() === section

            );

            if (matched) {

                current = matched.toLowerCase();

                sections[current] = "";

                continue;

            }

            sections[current] += line + "\n";

        }

        return sections;

    }

}

export default new SectionDetector();