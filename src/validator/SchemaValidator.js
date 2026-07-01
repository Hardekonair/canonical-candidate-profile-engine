class SchemaValidator {

    validate(candidate) {

        const errors = [];
        const warnings = [];

        /*
        ============================================
        Required Fields
        ============================================
        */

        if (!candidate.fullName?.trim()) {

            errors.push(
                "Full name is required."
            );

        }

        if (!candidate.emails?.length) {

            warnings.push(
                "No email found."
            );

        }

        if (!candidate.phones?.length) {

            warnings.push(
                "No phone number found."
            );

        }

        /*
        ============================================
        Email Validation
        ============================================
        */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        candidate.emails =
            (candidate.emails || []).filter(email => {

                if (!emailRegex.test(email)) {

                    warnings.push(
                        `Invalid email removed: ${email}`
                    );

                    return false;

                }

                return true;

            });

        /*
        ============================================
        Phone Validation
        ============================================
        */

        const phoneRegex =
            /^\+\d{10,15}$/;

        candidate.phones =
            (candidate.phones || []).filter(phone => {

                if (!phoneRegex.test(phone)) {

                    warnings.push(
                        `Invalid phone removed: ${phone}`
                    );

                    return false;

                }

                return true;

            });

        /*
        ============================================
        Duplicate Removal
        ============================================
        */

        candidate.skills =
            [...new Set(candidate.skills || [])];

        candidate.emails =
            [...new Set(candidate.emails || [])];

        candidate.phones =
            [...new Set(candidate.phones || [])];

        candidate.languages =
            [...new Set(candidate.languages || [])];

        candidate.certifications =
            [...new Set(candidate.certifications || [])];

        candidate.projects =
            [...new Set(candidate.projects || [])];

        /*
        ============================================
        Empty Arrays
        ============================================
        */

        candidate.skills ??= [];
        candidate.education ??= [];
        candidate.experience ??= [];
        candidate.projects ??= [];
        candidate.certifications ??= [];
        candidate.languages ??= [];
        candidate.emails ??= [];
        candidate.phones ??= [];

        /*
        ============================================
        Empty Strings
        ============================================
        */

        candidate.currentCompany ??= "";

        candidate.currentTitle ??= "";

        candidate.location ??= "";

        candidate.summary ??= "";

        /*
        ============================================
        Validation Result
        ============================================
        */

        return {

            valid:
                errors.length === 0,

            errors,

            warnings

        };

    }

}

export default new SchemaValidator();