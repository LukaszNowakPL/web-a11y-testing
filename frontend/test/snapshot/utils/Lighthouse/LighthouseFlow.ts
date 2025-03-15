import {UserFlow, OutputMode, FlowResult} from 'lighthouse';
import {TestInfo, expect} from '@playwright/test';
import {LighthouseReportWriter} from './LighthouseReportWriter';
import {LighthouseReportFile} from './LighthouseReportFile';

export class LighthouseFlow {
    protected constructor(
        public name: string,
        protected flow: UserFlow,
    ) {}

    public async generateReports(
        testInfo: TestInfo,
        filename: string,
        lighthouseThresholds: {[key in 'accessibility' | 'best-practices' | 'seo']: number},
        formats: OutputMode[] = ['html'],
    ) {
        if (!formats.length) {
            throw new Error('Define at least one report format');
        }
        const writer = new LighthouseReportWriter(new LighthouseReportFile(this.name));
        const reports: string[] = [];
        for (let formatIndex = 0; formatIndex < formats.length; formatIndex += 1) {
            const format = formats[formatIndex];
            const report = await this.flow.generateReport();
            reports.push(report);
            await writer.saveReport(format, report);
        }
        const res = await this.flow.createFlowResult();

        // Attach Lighthouse report to Playwright report
        await testInfo.attach(filename, {body: reports.toString()});

        // Fail the test if results calculated are below given thresholds
        this.failIfResultsBelowThresholds(res.steps, lighthouseThresholds);
    }

    private failIfResultsBelowThresholds = (
        stepResults: FlowResult.Step[],
        thresholds: {[key in 'accessibility' | 'best-practices' | 'seo']: number},
    ) => {
        const categories = Object.keys(thresholds) as ('accessibility' | 'best-practices' | 'seo')[];

        let thresholdFailures: string[] = [];

        stepResults.forEach((step) => {
            categories.forEach((category) => {
                const score = (step.lhr.categories[category].score || 0) * 100;
                if (thresholds[category] !== undefined && score < thresholds[category]) {
                    thresholdFailures.push(
                        `${category} audit on ${step.name} - expected score: ${thresholds[category]}, received: ${score}`,
                    );
                }
            });
        });

        expect(thresholdFailures).toStrictEqual([]);
    };

    public static async startFlow(): Promise<LighthouseFlow> {
        throw new Error('Overwrite this method');
    }
}
