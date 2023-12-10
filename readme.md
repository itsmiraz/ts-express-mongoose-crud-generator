# Project Name - TS MODULES GENERATOR BY [Miraj Hossen](https://mirajhossen.vercel.app/)

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Code Generator](#running-the-code-generator)
- [Built With](#https://www.typescriptlang.org)

## Overview

This Node.js script facilitates the rapid setup of a TypeScript Express project structure tailored for Express.js applications. The script automates the generation of crucial files, including interfaces, models, routes, controllers, and services, enforcing a standardized naming convention.

## Key Features

- **File Generation:** Automatically creates TypeScript files with predefined structures, promoting consistency in project organization.
- **Utility Function:** Ensures the existence of a `catchAsync.ts` file within the `utils` directory. This file contains a common higher-order function (`catchAsync`) used for error handling in Express.js.

## Usage

1. **Input Parameters:** Provide the target directory path and a base file name as input parameters.

2. **Execution:** Run the script to generate project files, adhering to the specified naming conventions.

3. **Consistent Project Layout:** Encourages a standardized project structure for TypeScript-based Express.js applications.

## Table of Contents

## Getting Started

These instructions will guide you on setting up and running the project on your local machine.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/itsmiraz/ts-modules-generator.git
   ```

2. Navigate to the project directory.

Copy the generateFile.ts file into your Express app in root Directory

3. Convert in Javascript.

   ```bash
   tsc generateFile.ts
   ```

## Running the Code Generator

Generate files using the following command:

```bash
node generateFiles /path/to/your/directory yourFileName
```
