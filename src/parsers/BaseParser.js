/**
 * BaseParser
 *
 * Acts as an abstract parser.
 * Every parser must implement parse(source).
 */

class BaseParser {

    async parse(source) {
        throw new Error(
            `${this.constructor.name} must implement parse(source).`
        );
    }

}

export default BaseParser;