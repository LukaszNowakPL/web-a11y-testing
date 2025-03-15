import {AirportDto, AirportsDto} from '../../../src/api/rest/airports.dto';
import {Page} from '@playwright/test';
import {Mockiavelli} from 'mockiavelli';

export const airportMock = async (page: Page, id: number, responseData: AirportDto, status = 200) =>
    await page.route(`*/**/api/airports/${id}`, async (route) => {
        // Additional delay to allow tests to assert loader display
        await page.waitForTimeout(1000);
        await route.fulfill({json: responseData, status});
    });

export const airportsMock = async (page: Page, responseData: AirportsDto, status = 200) =>
    await page.route('*/**/api/airports', async (route, request) => {
        if (request.method() === 'POST') {
            /**
             * This is an escape hatch to allow Mockiavelli to catch POST api call.
             */
            await route.fallback();
        } else {
            await route.fulfill({json: responseData, status});
        }
    });

export function mockPostAirportsRequest(mockiavelli: Mockiavelli, status: number = 200) {
    /**
     * Due to cross-origin policy and backend service being available under different port number
     * it's necessary to use full request URL here.
     */
    return mockiavelli.mockPOST('http://localhost:4000/api/airports', {
        status,
        body: {},
    });
}
