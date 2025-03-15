import {Page} from '@playwright/test';
import {RegionsDto} from '../../../src/api/rest/regions.dto';

export const regionsMock = async (page: Page, responseData: RegionsDto, status = 200, times?: number) =>
    await page.route(
        '*/**/api/regions',
        async (route) => {
            await route.fulfill({json: responseData, status});
        },
        {times},
    );
