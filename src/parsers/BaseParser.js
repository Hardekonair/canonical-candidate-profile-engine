/**
 * BaseParser
 *
 * Acts like an abstract class.
 * Every parser must implement parse().
 */

class BaseParser {
    async parse(source) {
        throw new Error(
            `${this.constructor.name} must implement parse(source)`
        );
    }
}

export default BaseParser;