import * as fs from "fs";
import * as path from "path";

const generateFile = (filePath: string, template: string): void => {
  const content = template || ""; // Use the provided template or an empty string
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`File ${filePath} created successfully.`);
};

const main = (): void => {
  const directoryPath = process.argv[2];
  const fileName = process.argv[3];

  if (!directoryPath || !fileName) {
    console.error("Please provide a directory path and a file name.");
    return;
  }

  const extensions = ["interface", "model", "route", "controller", "service"];

  extensions.forEach(extension => {
    const fullFilePath = path.join(
      directoryPath,
      `${fileName}.${extension}.ts`
    );

    // Add your code template for each file type
    let template = "";
    if (extension === "interface") {
      template = `export type T${fileName} = {\n  // Your interface definition here\n}\n`;
    } else if (extension === "model") {
      template = `import { Schema, model } from 'mongoose';\n`;
      template += `import { T${fileName} } from './${fileName}.interface';\n\n`;
      template += `const ${fileName}Schema = new Schema<T${fileName}>(\n`;
      template += `  {\n`;
      template += `    // Your Model according to the interface\n`;
      template += `  },\n\n`;
      template += `  {\n`;
      template += `    timestamps: true,\n`;
      template += `  },\n);\n\n`;
      template += `export const ${fileName} = model<T${fileName}>('${fileName}', ${fileName}Schema);\n`;
    } else if (extension === "route") {
      template = `import express from 'express';\n`;
      template += `import { ${fileName}Controllers } from './${fileName}.controller';\n\n`;
      template += `const router = express.Router();\n\n`;
      template += `router.post('/create', ${fileName}Controllers.create${fileName});\n\n`;
      template += `router.get('/', ${fileName}Controllers.get${fileName}s);\n`;
      template += `router.get('/:id', ${fileName}Controllers.getSingle${fileName});\n`;
      template += `router.patch('/:id', ${fileName}Controllers.update${fileName});\n`;
      template += `router.delete('/:id', ${fileName}Controllers.delete${fileName});\n\n`;
      template += `export const ${fileName}Routes = router;\n`;
    } else if (extension === "controller") {
      template = `export class ${fileName}Controller {\n  // Your controller class definition here\n}\n`;
    } else if (extension === "service") {
      template = `export class ${fileName}Service {\n  // Your service class definition here\n}\n`;
    }

    generateFile(fullFilePath, template);
  });
};

main();
