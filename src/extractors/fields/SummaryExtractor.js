class SummaryExtractor {

    extract(sections) {

        return (
            sections.summary ||
            sections.profile ||
            sections.about ||
            ""
        ).trim();

    }

}

export default new SummaryExtractor();