import {Page, Request} from '@playwright/test';

export class PayloadCall {
    constructor(public page: Page) {}

    protected request: Request | undefined = undefined;

    public async waitForRequest() {
        await this.getRequest();
    }

    private async getRequest() {
        if (this.request) {
            return this.request;
        } else {
            throw new Error('The request has not been triggered');
        }
    }

    public async getRequestBody() {
        return (await this.getRequest()).postDataJSON();
    }

    public async handlePostCall(url: string, conf: RequestConf) {
        await this.handlePayloadCall(url, 'POST', conf);
        return this;
    }
    public async handlePutCall(url: string, conf: RequestConf) {
        await this.handlePayloadCall(url, 'PUT', conf);
        return this;
    }

    private async handlePayloadCall(url: string, method: CallMethod, {status}: RequestConf) {
        await this.page.route(url, async (route, request) => {
            if (request.method() === method) {
                this.request = request;
                await route.fulfill({json: {}, status});
            } else {
                /**
                 * This is an escape hatch to resolve other actions to the same endpoint.
                 */
                await route.fallback();
            }
        });
    }
}

type CallMethod = 'POST' | 'PUT';
interface RequestConf {
    status: number;
}
