/**
 * Centralized Regular Expressions
 * Used across all extractors.
 */

const RegexPatterns = {

    EMAIL:
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi,

    PHONE:
        /(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,5}\)?[\s-]?)?\d{10}/g,

    LINKEDIN:
        /https?:\/\/(?:www\.)?linkedin\.com\/[^\s]+/gi,

    GITHUB:
        /https?:\/\/(?:www\.)?github\.com\/[^\s]+/gi,

    WEBSITE:
        /https?:\/\/(?!.*(?:linkedin|github))[^\s]+/gi,

    YEAR:
        /\b(19|20)\d{2}\b/g,

    YEAR_RANGE:
        /\b(19|20)\d{2}\s*[-–]\s*(Present|(19|20)\d{2})\b/gi

};

export default RegexPatterns;