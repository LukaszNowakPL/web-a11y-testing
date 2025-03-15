import {Page} from '@playwright/test';
import {CountriesDto} from '../../../src/api/rest/countries.dto';

export const countriesMock = async (page: Page, responseData: CountriesDto, status = 200, delay = 0) =>
    await page.route('*/**/api/countries', async (route) => {
        if (delay > 0) {
            // Additional delay to allow tests to assert loader display
            await page.waitForTimeout(delay);
        }
        await route.fulfill({json: responseData, status});
    });
