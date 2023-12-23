"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var generateFile = function (filePath, template) {
    var content = template || ''; // Use the provided template or an empty string
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("File ".concat(filePath, " created successfully."));
};
var main = function () {
    var directoryPath = process.argv[2];
    var fileName = process.argv[3];
    if (!directoryPath || !fileName) {
        console.error('Please provide a directory path and a file name.');
        return;
    }
    var utilsDirectory = path.join(directoryPath, 'utils');
    var catchAsyncFilePath = path.join(utilsDirectory, 'catchAsync.ts');
    if (!fs.existsSync(utilsDirectory)) {
        fs.mkdirSync(utilsDirectory);
    }
    // Add catchAsync.ts file
    if (!fs.existsSync(catchAsyncFilePath)) {
        var catchAsyncCode = "import { NextFunction, Request, RequestHandler, Response } from 'express';\n\n" +
            "// HOF\n" +
            "export const catchAsync = (fn: RequestHandler) => {\n" +
            "  return (req: Request, res: Response, next: NextFunction) => {\n" +
            "    Promise.resolve(fn(req, res, next)).catch((err) => next(err));\n" +
            "  };\n" +
            "};\n";
        fs.writeFileSync(catchAsyncFilePath, catchAsyncCode);
        console.log("catchAsync.ts created at ".concat(catchAsyncFilePath));
    }
    var extensions = ['interface', 'model', 'route', 'controller', 'service'];
    extensions.forEach(function (extension) {
        var fullFilePath = path.join(directoryPath, "".concat(fileName, ".").concat(extension, ".ts"));
        // Add your code template for each file type
        var template = '';
        if (extension === 'interface') {
            template = "export type T".concat(fileName, " = {\n  // Your interface definition here\n}\n");
        }
        else if (extension === 'model') {
            template = "import { Schema, model } from 'mongoose';\n";
            template += "import { T".concat(fileName, " } from './").concat(fileName, ".interface';\n\n");
            template += "const ".concat(fileName, "Schema = new Schema<T").concat(fileName, ">(\n");
            template += "  {\n";
            template += "    // Your Model according to the interface\n";
            template += "  },\n\n";
            template += "  {\n";
            template += "    timestamps: true,\n";
            template += "  },\n);\n\n";
            template += "export const ".concat(fileName, " = model<T").concat(fileName, ">('").concat(fileName, "', ").concat(fileName, "Schema);\n");
        }
        else if (extension === 'route') {
            template = "import express from 'express';\n";
            template += "import { ".concat(fileName, "Controllers } from './").concat(fileName, ".controller';\n\n");
            template += "const router = express.Router();\n\n";
            template += "router.post('/create', ".concat(fileName, "Controllers.create").concat(fileName, ");\n\n");
            template += "router.get('/', ".concat(fileName, "Controllers.getAll").concat(fileName, "s);\n");
            template += "router.get('/:id', ".concat(fileName, "Controllers.getSingle").concat(fileName, ");\n");
            template += "router.patch('/:id', ".concat(fileName, "Controllers.update").concat(fileName, ");\n");
            template += "router.delete('/:id', ".concat(fileName, "Controllers.delete").concat(fileName, ");\n\n");
            template += "export const ".concat(fileName, "Routes = router;\n");
        }
        else if (extension === 'controller') {
            template = "import { catchAsync } from './utils/catchAsync';\n";
            template += "import { ".concat(fileName, "Services } from './").concat(fileName, ".service';\n");
            template += "const create".concat(fileName, " = catchAsync(async (req, res) => {\n");
            template += "  const result = await ".concat(fileName, "Services.create").concat(fileName, "IntoDB(req.body);\n\n");
            template += "  res.status(200).json({\n";
            template += "    success: true,\n";
            template += "    message: '".concat(fileName, " successfully created',\n");
            template += "    data: result,\n";
            template += "  });\n});\n\n";
            template += "const getAll".concat(fileName, "s = catchAsync(async (req, res) => {\n");
            template += "  const result = await ".concat(fileName, "Services.getAll").concat(fileName, "sFromDb();\n");
            template += "  res.status(200).json({\n";
            template += "    success: true,\n";
            template += "    message: '".concat(fileName, "s successfully retrieved',\n");
            template += "    data: result,\n";
            template += "  });\n});\n\n";
            template += "const getSingle".concat(fileName, " = catchAsync(async (req, res) => {\n");
            template += "  const ".concat(fileName, "Id = req.params.id;\n");
            template += "  const result = await ".concat(fileName, "Services.getSingle").concat(fileName, "FromDb(").concat(fileName, "Id);\n\n");
            template += "  res.status(200).json({\n";
            template += "    success: true,\n";
            template += "    message: 'Here is your ".concat(fileName, "',\n");
            template += "    data: result,\n";
            template += "  });\n});\n\n";
            template += "const update".concat(fileName, " = catchAsync(async (req, res) => {\n");
            template += "  const { ".concat(fileName, "Id } = req.params;\n");
            template += "  const result = await ".concat(fileName, "Services.update").concat(fileName, "IntoDB(").concat(fileName, "Id, req.body);\n");
            template += "  res.status(200).json({\n";
            template += "    success: true,\n";
            template += "    message: '".concat(fileName, " Updated',\n");
            template += "    data: result,\n";
            template += "  });\n});\n\n";
            template += "const delete".concat(fileName, " = catchAsync(async (req, res) => {\n");
            template += "  const { ".concat(fileName, "Id } = req.params;\n");
            template += "  const result = await ".concat(fileName, "Services.delete").concat(fileName, "IntoDB(").concat(fileName, "Id);\n");
            template += "  res.status(200).json({\n";
            template += "    success: true,\n";
            template += "    message: '".concat(fileName, " Deleted Successfully',\n");
            template += "    data: result,\n";
            template += "  });\n});\n\n";
            template += "export const ".concat(fileName, "Controllers = {\n");
            template += "  create".concat(fileName, ",\n");
            template += "  getSingle".concat(fileName, ",\n");
            template += "  getAll".concat(fileName, "s,\n");
            template += "  delete".concat(fileName, ",\n");
            template += "  update".concat(fileName, ",\n");
            template += "};\n";
        }
        else if (extension === 'service') {
            template = "import { ".concat(fileName, " } from './").concat(fileName, ".model';\n");
            template += "import { T".concat(fileName, " } from './").concat(fileName, ".interface';\n\n");
            template += "const create".concat(fileName, "IntoDB = async (payload: T").concat(fileName, ") => {\n");
            template += "  const result = await ".concat(fileName, ".create(payload);\n\n");
            template += "  return result;\n};\n\n";
            template += "const getAll".concat(fileName, "sFromDb = async () => {\n");
            template += "  const result = ''; // Your Business Logic\n";
            template += "  return result;\n};\n\n";
            template += "const getSingle".concat(fileName, "FromDb = async (id: string) => {\n");
            template += "  const result = await ".concat(fileName, ".findById(id);\n\n");
            template += "  return result;\n};\n\n";
            template += "const update".concat(fileName, "IntoDB = async (id: string, payload: Partial<T").concat(fileName, ">) => {\n");
            template += "  const result = await ".concat(fileName, ".findOneAndUpdate({ _id: id }, payload, {\n");
            template += "    new: true,\n";
            template += "  });\n";
            template += "  return result;\n};\n\n";
            template += "const delete".concat(fileName, "IntoDB = async (id: string) => {\n");
            template += "  const result = await ".concat(fileName, ".findByIdAndDelete(id);\n");
            template += "  return result;\n};\n\n";
            template += "export const ".concat(fileName, "Services = {\n");
            template += "  create".concat(fileName, "IntoDB,\n");
            template += "  getAll".concat(fileName, "sFromDb,\n");
            template += "  getSingle".concat(fileName, "FromDb,\n");
            template += "  update".concat(fileName, "IntoDB,\n");
            template += "  delete".concat(fileName, "IntoDB,\n");
            template += "};\n";
        }
        generateFile(fullFilePath, template);
    });
};
main();
