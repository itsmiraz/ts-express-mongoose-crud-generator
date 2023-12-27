# TypeScript Express Mongosse Crud Modules Generator

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

- [Built With](https://www.typescriptlang.org)

## Overview

This Node.js script facilitates the rapid setup of a TypeScript Express project structure tailored for Express.js applications. The script automates the generation of crucial files, including interfaces, models, routes, controllers, and services, enforcing a standardized naming convention.

## Key Features

- **File Generation:** Automatically creates TypeScript files with predefined structures, promoting consistency in project organization.

## Usage

1. **Input Parameters:** Provide the target directory path and a base file name as input parameters.

2. **Execution:** Run the script to generate project files, adhering to the specified naming conventions.

3. **Consistent Project Layout:** Encourages a standardized project structure for TypeScript-based Express.js applications.

## Getting Started

These instructions will guide you on setting up and running the project on your local machine.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Expressjs](https://expressjs.com/)
- [Mongoosejs](https://mongoosejs.com/)

### Installation

1. Command.

   ```bash
   npm i ts-express-mongoose-crud-gen
   ```

2. Navigate to the project cli.

```bash
   generate-modules ./path fileName
```

And here you go a bowler plate with routing , controller, service , utils , model generated.

### Usage Examples

- Provide examples of how users can use your package to generate modules. Include command examples and explanations.

```dotnetcli
# Example:
generate-modules ./src/modules/user user
```

### Contriubutors

- [Miraj Hossen](https://mirajhossen.vercel.app/)
