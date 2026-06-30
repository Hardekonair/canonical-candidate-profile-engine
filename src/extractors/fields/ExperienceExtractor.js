class ExperienceExtractor {

    extract(sections) {

        if (!sections.experience)
            return [];

        const lines = sections.experience
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        const experience = [];

        let current = {};

        for (const line of lines) {

            if (/Company:/i.test(line)) {

                current.company =
                    line.replace(/Company:/i, "").trim();

            }

            else if (/Title:/i.test(line)) {

                current.title =
                    line.replace(/Title:/i, "").trim();

            }

            else {

                current.description =
                    current.description
                        ? current.description + " " + line
                        : line;

            }

        }

        if (Object.keys(current).length)
            experience.push(current);

        return experience;

    }

}

export default new ExperienceExtractor();