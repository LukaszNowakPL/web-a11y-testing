import type {Puppeteer} from 'lighthouse';
import type {Page, CDPSession} from '@playwright/test';

export function PageAdapter(page: Page) {
    return {
        url() {
            return page.url();
        },
        target() {
            return {
                async createCDPSession() {
                    const session = await page.context().newCDPSession(page);
                    return CDPSessionAdapter(session);
                },
            };
        },
    } as Puppeteer.Page;
}

function CDPSessionAdapter(session: CDPSession) {
    Object.defineProperty(session, 'id', {
        value: () => '',
    });

    return session as unknown as Puppeteer.CDPSession;
}
