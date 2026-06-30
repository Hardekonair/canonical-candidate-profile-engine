class EducationExtractor {

    extract(sections) {

        if (!sections.education)
            return [];

        const lines = sections.education
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        const education = [];

        let current = {};

        for (const line of lines) {

            if (/Bachelor|Master|B\.?Tech|M\.?Tech|BCA|MCA|BSc|MSc|MBA|PhD/i.test(line)) {

                if (Object.keys(current).length)
                    education.push(current);

                current = {
                    degree: line
                };

            }

            else if (/(19|20)\d{2}/.test(line)) {

                current.year = line;

            }

            else {

                current.institution =
                    current.institution
                        ? current.institution + " " + line
                        : line;

            }

        }

        if (Object.keys(current).length)
            education.push(current);

        return education;

    }

}

export default new EducationExtractor();