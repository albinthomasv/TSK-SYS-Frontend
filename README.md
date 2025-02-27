# Angular Project Setup Guide

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **npm** (Comes with Node.js)
- **Angular CLI** (Globally installed via npm)

### Verify Node.js and npm Installation
Run the following commands to check if Node.js and npm are installed:
```sh
node -v
npm -v
```
If not installed, download and install Node.js from [nodejs.org](https://nodejs.org/).

## Project Setup
### Step 1: Install Dependencies
Navigate to the project repository and install dependencies:
```sh
npm install
```

### Step 2: Set Backend URL
Update the environment configuration file with the backend URL:
- Open `src/environments/environment.ts`
- Modify `baseUrl` or relevant property with the backend URL.

### Step 3: Start the Application
Run the following command to start the Angular development server:
```sh
ng serve
```
By default, the app runs on `http://localhost:4200/`. Open this URL in a web browser.

## Building the Application for Production
To build the project for production, use:
```sh
ng build --prod
```
The output will be available in the `dist/` directory.

## Updating Angular CLI and Project
To update Angular CLI globally, run:
```sh
npm update -g @angular/cli
```
To update an existing Angular project, navigate to the project directory and run:
```sh
ng update
```

## Additional Commands
- **Generate a component:** `ng generate component component-name`
- **Generate a service:** `ng generate service service-name`
- **Add a new module:** `ng generate module module-name`
- **Run unit tests:** `ng test`
- **Run end-to-end tests:** `ng e2e`

## Troubleshooting
If you encounter issues, try the following:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall dependencies:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- Ensure you are using a compatible Node.js version.

For more details, visit the official Angular documentation: [https://angular.io/docs](https://angular.io/docs)

---
**Author:** Your Name  
**Date:** YYYY-MM-DD


