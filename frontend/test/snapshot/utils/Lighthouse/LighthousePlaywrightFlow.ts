import {Page} from '@playwright/test';
import {startFlow, UserFlow} from 'lighthouse';
import {PageAdapter} from './LighthouseAdapter';
import {LighthouseFlow} from './LighthouseFlow';

export class LighthousePlaywrightFlow extends LighthouseFlow {
    public async snapshot(name: string, flags?: Omit<UserFlow.StepFlags, 'name'>): Promise<void> {
        return this.flow.snapshot({...flags, name});
    }

    static async startFlow(name: string, page: Page, options?: Omit<UserFlow.Options, 'name'>) {
        const flow = await startFlow(PageAdapter(page), {name, ...options});
        return new LighthousePlaywrightFlow(name, flow);
    }
}
