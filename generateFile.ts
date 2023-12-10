import * as fs from 'fs';
import * as path from 'path';

const generateFile = (filePath: string, template: string): void => {
  const content = template || ''; // Use the provided template or an empty string
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`File ${filePath} created successfully.`);
};

const main = (): void => {
  const directoryPath = process.argv[2];
  const fileName = process.argv[3];

  if (!directoryPath || !fileName) {
    console.error('Please provide a directory path and a file name.');
    return;
  }

  const utilsDirectory = path.join(directoryPath, 'utils');
  const catchAsyncFilePath = path.join(utilsDirectory, 'catchAsync.ts');

  if (!fs.existsSync(utilsDirectory)) {
    fs.mkdirSync(utilsDirectory);
  }

  // Add catchAsync.ts file
  if (!fs.existsSync(catchAsyncFilePath)) {
    const catchAsyncCode =
      `import { NextFunction, Request, RequestHandler, Response } from 'express';\n\n` +
      `// HOF\n` +
      `export const catchAsync = (fn: RequestHandler) => {\n` +
      `  return (req: Request, res: Response, next: NextFunction) => {\n` +
      `    Promise.resolve(fn(req, res, next)).catch((err) => next(err));\n` +
      `  };\n` +
      `};\n`;

    fs.writeFileSync(catchAsyncFilePath, catchAsyncCode);
    console.log(`catchAsync.ts created at ${catchAsyncFilePath}`);
  }

  const extensions = ['interface', 'model', 'route', 'controller', 'service'];

  extensions.forEach((extension) => {
    const fullFilePath = path.join(
      directoryPath,
      `${fileName}.${extension}.ts`,
    );

    // Add your code template for each file type
    let template = '';
    if (extension === 'interface') {
      template = `export type T${fileName} = {\n  // Your interface definition here\n}\n`;
    } else if (extension === 'model') {
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
    } else if (extension === 'route') {
      template = `import express from 'express';\n`;
      template += `import { ${fileName}Controllers } from './${fileName}.controller';\n\n`;
      template += `const router = express.Router();\n\n`;
      template += `router.post('/create', ${fileName}Controllers.create${fileName});\n\n`;
      template += `router.get('/', ${fileName}Controllers.getAll${fileName}s);\n`;
      template += `router.get('/:id', ${fileName}Controllers.getSingle${fileName});\n`;
      template += `router.patch('/:id', ${fileName}Controllers.update${fileName});\n`;
      template += `router.delete('/:id', ${fileName}Controllers.delete${fileName});\n\n`;
      template += `export const ${fileName}Routes = router;\n`;
    } else if (extension === 'controller') {
      template = `import { catchAsync } from './utils/catchAsync';\n`;
      template += `import { ${fileName}Services } from './${fileName}.service';\n`;
      template += `const create${fileName} = catchAsync(async (req, res) => {\n`;
      template += `  const result = await ${fileName}Services.create${fileName}IntoDB(req.body);\n\n`;
      template += `  res.status(200).json({\n`;
      template += `    success: true,\n`;
      template += `    message: '${fileName} successfully created',\n`;
      template += `    data: result,\n`;
      template += `  });\n});\n\n`;
      template += `const getAll${fileName}s = catchAsync(async (req, res) => {\n`;
      template += `  const result = await ${fileName}Services.getAll${fileName}sFromDb();\n`;
      template += `  res.status(200).json({\n`;
      template += `    success: true,\n`;
      template += `    message: '${fileName}s successfully retrieved',\n`;
      template += `    data: result,\n`;
      template += `  });\n});\n\n`;
      template += `const getSingle${fileName} = catchAsync(async (req, res) => {\n`;
      template += `  const ${fileName}Id = req.params.id;\n`;
      template += `  const result = await ${fileName}Services.getSingle${fileName}FromDb(${fileName}Id);\n\n`;
      template += `  res.status(200).json({\n`;
      template += `    success: true,\n`;
      template += `    message: 'Here is your ${fileName}',\n`;
      template += `    data: result,\n`;
      template += `  });\n});\n\n`;
      template += `const update${fileName} = catchAsync(async (req, res) => {\n`;
      template += `  const { ${fileName}Id } = req.params;\n`;
      template += `  const result = await ${fileName}Services.update${fileName}IntoDB(${fileName}Id, req.body);\n`;
      template += `  res.status(200).json({\n`;
      template += `    success: true,\n`;
      template += `    message: '${fileName} Updated',\n`;
      template += `    data: result,\n`;
      template += `  });\n});\n\n`;
      template += `const delete${fileName} = catchAsync(async (req, res) => {\n`;
      template += `  const { ${fileName}Id } = req.params;\n`;
      template += `  const result = await ${fileName}Services.delete${fileName}IntoDB(${fileName}Id);\n`;
      template += `  res.status(200).json({\n`;
      template += `    success: true,\n`;
      template += `    message: '${fileName} Deleted Successfully',\n`;
      template += `    data: result,\n`;
      template += `  });\n});\n\n`;
      template += `export const ${fileName}Controllers = {\n`;
      template += `  create${fileName},\n`;
      template += `  getSingle${fileName},\n`;
      template += `  getAll${fileName}s,\n`;
      template += `  delete${fileName},\n`;
      template += `  update${fileName},\n`;
      template += `};\n`;
    } else if (extension === 'service') {
      template = `import { ${fileName} } from './${fileName}.model';\n`;
      template += `import { T${fileName} } from './${fileName}.interface';\n\n`;
      template += `const create${fileName}IntoDB = async (payload: T${fileName}) => {\n`;
      template += `  const result = await ${fileName}.create(payload);\n\n`;
      template += `  return result;\n};\n\n`;
      template += `const getAll${fileName}sFromDb = async () => {\n`;
      template += `  const result = ''; // Your Business Logic\n`;
      template += `  return result;\n};\n\n`;
      template += `const getSingle${fileName}FromDb = async (id: string) => {\n`;
      template += `  const result = await ${fileName}.findById(id);\n\n`;
      template += `  return result;\n};\n\n`;
      template += `const update${fileName}IntoDB = async (id: string, payload: Partial<T${fileName}>) => {\n`;
      template += `  const result = await ${fileName}.findOneAndUpdate({ _id: id }, payload, {\n`;
      template += `    new: true,\n`;
      template += `  });\n`;
      template += `  return result;\n};\n\n`;
      template += `const delete${fileName}IntoDB = async (id: string) => {\n`;
      template += `  const result = await ${fileName}.findByIdAndDelete(id);\n`;
      template += `  return result;\n};\n\n`;
      template += `export const ${fileName}Services = {\n`;
      template += `  create${fileName}IntoDB,\n`;
      template += `  getAll${fileName}sFromDb,\n`;
      template += `  getSingle${fileName}FromDb,\n`;
      template += `  update${fileName}IntoDB,\n`;
      template += `  delete${fileName}IntoDB,\n`;
      template += `};\n`;
    }

    generateFile(fullFilePath, template);
  });
};

main();
