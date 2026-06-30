class SkillExtractor {

    constructor() {

        this.skills = [

            "C",
            "C++",
            "Java",
            "Python",
            "JavaScript",
            "TypeScript",

            "HTML",
            "CSS",

            "React",
            "ReactJS",
            "Angular",
            "Vue",

            "Node.js",
            "NodeJS",
            "Express",
            "ExpressJS",

            "MongoDB",
            "MySQL",
            "PostgreSQL",

            "Git",
            "GitHub",

            "Docker",

            "AWS",
            "Azure",

            "REST",
            "GraphQL"

        ];

    }

    extract(text) {

        const found = [];

        const lowerText = text.toLowerCase();

        for (const skill of this.skills) {

            const escaped = skill.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            const regex = new RegExp(
                `(^|\\W)${escaped}(\\W|$)`,
                "i"
            );

            if (regex.test(lowerText)) {

                found.push(skill);

            }

        }

        return [...new Set(found)];

    }

}

export default new SkillExtractor();