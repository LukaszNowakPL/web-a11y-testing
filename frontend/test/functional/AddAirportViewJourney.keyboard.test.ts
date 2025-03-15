import {expect, test} from '@playwright/test';
import {Mockiavelli} from 'mockiavelli';
import {AddAirportPage} from './a11yPages/AddAirportPage';
import {CountriesDto} from '../../src/api/rest/countries.dto';
import {RegionDto, RegionsDto} from '../../src/api/rest/regions.dto';
import {AirportModel} from '../../src/api/rest/airports.dto';
import {countriesMock} from '../playwright/api-mocks/countries';
import {regionsMock} from '../playwright/api-mocks/regions';
import {airportsMock, mockPostAirportsRequest} from '../playwright/api-mocks/airports';
import {goTo} from '../playwright/navigation';

test.describe('Add airport journey with keyboard navigation only', () => {
    let mockiavelli: Mockiavelli;
    let addAirportPage: AddAirportPage;

    test.beforeEach(async ({page}) => {
        mockiavelli = await Mockiavelli.setup(page);
        addAirportPage = new AddAirportPage(page);
    });

    test('Airport addition journey', async ({page}) => {
        /**
         * This test case focuses on airport addition happy path journey navigating only with keyboards.
         * The aim of such journey is to simulate navigation with assistive technology and asserting order of focusable elements.
         * Such navigation might be difficult to perform on entire pages with rich header section. This is why 'Skip to main content'
         * pattern comes handy and - in fact - is required according to WCAG rules.
         */

        // Given countries list available on the system
        const countries: CountriesDto = [
            {
                id: 1,
                name: 'test country name',
                is_in_schengen: true,
            },
        ];

        // And region to be selected during the test
        const regionToSelect: RegionDto = {
            id: 1,
            name: 'test region to select',
        };

        // And regions available on the system
        const regions: RegionsDto = [
            regionToSelect,
            {
                id: 2,
                name: 'test region not to select',
            },
        ];

        // And new airport data
        const airport: AirportModel = {
            name: 'test airport name',
            iata: 'TES',
            country_id: countries[0].id,
            regions: [regionToSelect.id],
            vaccination_notes: 'test vaccination notes',
        };

        // And mocks of api calls triggered during the test
        await countriesMock(page, countries);
        await regionsMock(page, regions);
        await airportsMock(page, []);
        const postAirportMock = mockPostAirportsRequest(mockiavelli);

        // When I go to Add airport page
        await goTo(page, '/airports/add');

        // Then I'm ready to start the journey
        await addAirportPage.assertReady();

        // When I fulfill and send the form
        await addAirportPage.proceedThroughPage(airport, countries[0].name, regionToSelect.name);

        // Then POST api call is resolved with expected body
        const postAirportRequest = await postAirportMock.waitForRequest();
        expect(postAirportRequest.body).toEqual(airport);

        // And addition confirmation is displayed after api call is resolved
        await addAirportPage.assertAdditionConfirmationDisplay();
    });
});
