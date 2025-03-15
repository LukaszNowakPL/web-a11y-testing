import {OutputMode} from 'lighthouse';
import path from 'path';
import {slugify} from '../helpers';

export class LighthouseReportFile {
    public dir: string;
    public fileName: string;
    public fileNamePrefix: string;
    public static defaultDir = `${process.cwd()}/reports/snapshot`;
    public static defaultFilenamePrefix = 'lighhouse-flow-';

    public constructor(name: string, dir?: string, fileNamePrefix?: string) {
        this.dir = dir || LighthouseReportFile.defaultDir;
        this.fileName = slugify(name);
        this.fileNamePrefix = typeof fileNamePrefix === 'string' ? slugify(fileNamePrefix) : LighthouseReportFile.defaultFilenamePrefix;
    }

    public filePath(format: OutputMode) {
        return path.join(this.dir, this.fullName(format));
    }

    public fullName(format: OutputMode) {
        return `${this.fileNamePrefix}${this.fileName}.${format}`;
    }
}
