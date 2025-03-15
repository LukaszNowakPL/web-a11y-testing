import {Page, TestInfo, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {slugify} from '../utils/helpers';
import {TakeLighthouseSnapshot} from '../types';
import {ARIA_SNAPSHOTS_DIRECTORY} from '../utils/const';

export class SnapshotPage {
    page: Page;
    testInfo: TestInfo;
    pageTitle: string;
    testSuite: string;

    public constructor(page: Page, testInfo: TestInfo, pageTitle: string, testSuite: string) {
        this.page = page;
        this.testInfo = testInfo;
        this.pageTitle = pageTitle;
        this.testSuite = testSuite;
    }

    public async assertSnapshots(snapshotTitle: string, config?: AssertSnapshotConfig) {
        await Promise.all([
            this.assertAxeChecks(snapshotTitle, Boolean(config?.skipAxeViolationChecks)),
            this.performAriaSnapshotComparison(snapshotTitle),
            config?.takeLighthouseSnapshot !== undefined && this.assertLighthouseSnapshot(snapshotTitle, config.takeLighthouseSnapshot),
        ]);
    }

    private async assertAxeChecks(snapshotTitle: string, skipViolationChecks: boolean) {
        const axeChecks = await new AxeBuilder({page: this.page})
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
            .analyze();

        await this.testInfo.attach(this.composeA11yReportName(snapshotTitle), {
            body: JSON.stringify(axeChecks, null, 2),
            contentType: 'application/json',
        });

        if (!skipViolationChecks) {
            expect(axeChecks.violations).toEqual([]);
        }
    }

    private composeA11yReportName(snapshotTitle: string) {
        return slugify(`${this.pageTitle} ${this.testSuite} ${snapshotTitle} a11y`);
    }

    private async assertLighthouseSnapshot(snapshotTitle: string, takeSnapshot: TakeLighthouseSnapshot) {
        await takeSnapshot(this.composeLighthouseSnapshotName(snapshotTitle));
    }

    private async performAriaSnapshotComparison(snapshotTitle: string) {
        expect(await this.page.locator('body').ariaSnapshot()).toMatchSnapshot([
            ARIA_SNAPSHOTS_DIRECTORY,
            `${this.composeSnapshotName(snapshotTitle)}.yml`,
        ]);
    }

    private composeSnapshotName(snapshotTitle: string) {
        return slugify(`${this.pageTitle} ${this.testSuite} ${snapshotTitle}`);
    }

    private composeLighthouseSnapshotName(snapshotTitle: string) {
        return slugify(`${this.pageTitle} / ${snapshotTitle}`);
    }
}

export interface AssertSnapshotConfig {
    takeLighthouseSnapshot: TakeLighthouseSnapshot;
    skipAxeViolationChecks?: true;
}
