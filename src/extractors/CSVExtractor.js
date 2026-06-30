import Candidate from "../models/Candidate.js";

class CSVExtractor {

    extract(rows) {

        return rows.map(row => {

            return new Candidate({

                candidateId: row.candidate_id ?? null,

                fullName: row.name ?? "",

                emails: row.email
                    ? [row.email]
                    : [],

                phones: row.phone
                    ? [row.phone]
                    : [],

                currentCompany:
                    row.current_company ?? "",

                currentTitle:
                    row.current_title ?? "",

                skills: [],

                education: [],

                experience: [],

                location: "",

                summary: ""

            });

        });

    }

}

export default CSVExtractor;