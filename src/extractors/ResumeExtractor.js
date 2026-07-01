import Candidate from "../models/Candidate.js";
import GeminiExtractor from "../llm/GeminiExtractor.js";
import PhoneNormalizer from "../utils/PhoneNormalizer.js";

class ResumeExtractor {

    async extract(resumeText) {

        const data = await GeminiExtractor.extract(resumeText);

        const candidate = new Candidate({

            candidateId: null,

            fullName:
                data.fullName
                    ? data.fullName
                        .toLowerCase()
                        .replace(
                            /\b\w/g,
                            char => char.toUpperCase()
                        )
                    : "",

            emails: data.emails || [],

            phones: PhoneNormalizer.normalizeArray(
                data.phones || []
            ),

            currentCompany: data.currentCompany || "",

            currentTitle: data.currentTitle || "",

            skills: data.skills || [],

            education: data.education || [],

            experience: data.experience || [],

            location: data.location || "",

            summary: data.summary || ""

        });

        // Extra fields
        candidate.projects = data.projects || [];

        candidate.certifications = data.certifications || [];

        candidate.languages = data.languages || [];

        candidate.links = data.links || {};

        return candidate;

    }

}

export default new ResumeExtractor();