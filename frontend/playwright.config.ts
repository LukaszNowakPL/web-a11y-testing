import {defineConfig, devices, PlaywrightTestProject} from '@playwright/test';

const IS_CI = Boolean(process.env.CI);

const snapshotTestingHost = 'localhost';
const connectOptions = undefined;

const snapshotProjectTemplate: PlaywrightTestProject = {
    outputDir: './test/snapshot/test-results',
    snapshotPathTemplate: '{testDir}/static-snapshots/{arg}{ext}',
    timeout: 60 * 1000,
    expect: {timeout: 15_000},
    use: {
        ...devices['chrome'],
        baseURL: `http://${snapshotTestingHost}:9000/`,
        connectOptions,
        defaultBrowserType: 'chromium',
        screenshot: 'on',
    },
};

export default defineConfig({
    name: 'playwright tests',
    outputDir: './test/functional/test-results',
    timeout: 45 * 1000,
    expect: {timeout: 15_000},
    forbidOnly: IS_CI,
    retries: IS_CI ? 2 : 0,
    reporter: [['list'], ['html', {outputFolder: './reports/playwright'}]],
    projects: [
        {
            name: 'Functional',
            testDir: './test/functional',
            outputDir: './test/functional/test-results',
        },
        {
            name: 'Snapshot',
            testDir: './test/snapshot',
            outputDir: './test/snapshot/test-results',
            ...snapshotProjectTemplate,
        },
    ],
    use: {
        browserName: 'chromium',
        headless: true,
        viewport: {width: 1600, height: 1200},
        baseURL: 'http://localhost:9000',
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        testIdAttribute: 'data-test-id',
    },
    webServer: {
        command: 'npm run preview',
        url: 'http://localhost:9000',
        reuseExistingServer: !IS_CI,
    },
});
