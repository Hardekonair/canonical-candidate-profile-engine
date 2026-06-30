class ProjectExtractor {

    extract(sections) {

        if (!sections.projects)
            return [];

        return sections.projects

            .split("\n")

            .map(project => project.trim())

            .filter(Boolean)

            .map(project => ({

                title: project

            }));

    }

}

export default new ProjectExtractor();