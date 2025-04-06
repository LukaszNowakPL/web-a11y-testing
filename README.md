# Web application accessibility testing

This repository supports `Web application a11y testing` talk. Its aim is to tell the real story of how my dev team created an a11y-focused culture from near zero level.

It contains example React SPA with supporting backend. Those components, however, are only a tool to perform a11y-related tests on. Tests are executed on Playwright and use Axe scanning and Lighthouse external dependencies.

This talk was performed during:

- [Warszawskie Dni Informatyki](https://warszawskiedniinformatyki.pl/conference/) conference (05.04.2025 - Warsaw, Poland)

## Project structure

The project contains React frontend application and supporting backend stub service based on `json-server` component.

Test examples are stored on [/frontend/test](/frontend/test) directory. They are executed on Playwright using two project definitions.

The `Functional` project performs example Happy path journey with keyboard only navigation. This is for simulating navigation using some assistive technologies.

The `Snapshot` project implements an Idea of snapshot - making the page to be on certain state and perform series of audits of the state. Currently, this is Axe and Lighthouse scanning and creation of a11y tree snapshot.

**Note**: Although tests pass, the application contains series of a11y errors. This happens because of low level thresholds, or violation checks being off on certain snapshot assertions. Please refer to [/frontend/reports/playwright/index.html](/frontend/reports/playwright/index.html) and [/frontend/reports/snapshot](/frontend/reports/snapshot) reports (after tests being fired) to get more details of the nature of each violation found.

## Commands available

`npm install` for installing dependencies of overall project.

`npm run install-all` for installing dependencies for backend and frontend components respectively.

`npm run all-components` will fire backend and frontend components locally. Frontend application will automatically open in the browser using http://localhost:3000/ url. Backend service is available under http://localhost:4000/ url.

`npm run test-frontend:windows` is a `npm run test-frontend` command dedicated to Windows users only. This alteration performs additional changes on aria snapshot files, due to different new line separator approaches for Windows and Linux (Git) systems.

`npm run test-frontend` for all tests of frontend project. This will fire both - Functional and Snapshot projects of Playwright.

`npm run preview` will bundle frontend project and preview the production build. Frontend preview is available under http://localhost:9000/ url. Backend service is available under http://localhost:4000/ url.

## Presentation

The repository contains pdf presentations displayed during meetings. Please note the language prefix used on file's name.

## Contact

- [GitHub profile](https://github.com/LukaszNowakPL/)
- [Linkedin profile](https://linkedin.com/in/%C5%82ukasz-nowak-533844101)
