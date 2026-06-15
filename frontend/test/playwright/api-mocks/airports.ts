import {AirportDto, AirportsDto} from '../../../src/api/rest/airports.dto';
import {Page} from '@playwright/test';
import {PayloadCall} from './utils/PayloadCall';

export const airportMock = async (page: Page, id: number, responseData: AirportDto, status = 200) =>
    await page.route(`*/**/api/airports/${id}`, async (route) => {
        // Additional delay to allow tests to assert loader display
        await page.waitForTimeout(1000);
        await route.fulfill({json: responseData, status});
    });

export const airportsMock = async (page: Page, responseData: AirportsDto, status = 200) =>
    await page.route('*/**/api/airports', async (route, request) => {
        if (request.method() === 'GET') {
            await route.fulfill({json: responseData, status});
        } else {
            /**
             * This is an escape hatch to resolve non-GET api calls.
             */
            await route.fallback();
        }
    });

export function mockPostAirportsRequest(payloadCall: PayloadCall, status: number = 200) {
    return payloadCall.handlePostCall('*/**/api/airports', {
        status,
    });
}
