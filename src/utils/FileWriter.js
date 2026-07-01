import fs from "fs";
import path from "path";

class FileWriter {

    write(fileName, data) {

        const outputDir = "./output";

        if (!fs.existsSync(outputDir)) {

            fs.mkdirSync(outputDir, {
                recursive: true
            });

        }

        const filePath = path.join(
            outputDir,
            fileName
        );

        fs.writeFileSync(

            filePath,

            JSON.stringify(data, null, 4),

            "utf8"

        );

        console.log(`✓ ${fileName} saved`);

    }

}

export default new FileWriter();