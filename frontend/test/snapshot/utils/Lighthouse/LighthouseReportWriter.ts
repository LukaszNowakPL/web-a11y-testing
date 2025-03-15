import {LighthouseReportFile} from './LighthouseReportFile';
import {OutputMode} from 'lighthouse';
import fs from 'fs/promises';

export class LighthouseReportWriter {
    public constructor(private file: LighthouseReportFile) {}

    public async saveReport(format: OutputMode, report: string): Promise<void> {
        await this.createDir(this.file.dir);
        const filePath = this.file.filePath(format);
        await fs.writeFile(filePath, report);
    }

    private async createDir(dir: string) {
        await fs.mkdir(dir, {recursive: true});
    }
}
