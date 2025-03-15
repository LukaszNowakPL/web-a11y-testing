import {AssertSnapshotConfig, SnapshotPage} from './SnapshotPage';
import {Page, TestInfo, expect} from '@playwright/test';
import {assertHeaderContent, assertIsOn} from '../../playwright/assertions';
import {AirportModel} from '../../../src/api/rest/airports.dto';

export class AddAirportPage extends SnapshotPage {
    public constructor(page: Page, testInfo: TestInfo, testSuite: string) {
        super(page, testInfo, 'Add airport', testSuite);
    }

    public async assertProgressBarDisplay() {
        await expect(this.page.getByTestId('progress-bar')).toBeVisible();
    }

    public async assertReady() {
        await assertIsOn(this.page, 'airports/add');
        await assertHeaderContent(this.page, /add airport/i);
    }

    public async fulfillForm(data: AirportModel, country: string, region: string) {
        await this.page.getByRole('textbox', {name: /name/i}).fill(data.name);
        await this.page.getByRole('textbox', {name: /iata code/i}).fill(data.iata);
        await this.page.getByRole('combobox', {name: /country/i}).click();
        await this.page.getByRole('option', {name: country}).click();
        await this.page.getByRole('checkbox', {name: region}).click();
        await this.page.getByRole('textbox', {name: /vaccination notes/i}).fill(data.vaccination_notes as string);
    }

    public async assertSubmitEnabled() {
        await expect(this.page.getByRole('button', {name: /submit/i})).toBeEnabled();
    }

    public async sendData() {
        await this.page.getByRole('button', {name: /submit/i}).click();
    }

    public assertAdditionConfirmationDisplay = async () => {
        await expect(this.page.getByText(/airport added successfully/i)).toBeVisible();
    };

    public assertConnectivityError = async () => {
        await expect(this.page.getByText(/sorry, there is some connectivity error/i)).toBeVisible();
    };

    public refetchData = async () => {
        await this.page.getByRole('button', {name: /restart data fetching/i}).click();
    };

    public assertAdditionErrorDisplay = async () => {
        await expect(this.page.getByText(/error while adding an airport/i)).toBeVisible();
    };

    public async fulfillFormIncorrectly() {
        await this.page.getByRole('textbox', {name: /name/i}).fill(' ');
        await this.page.getByRole('textbox', {name: /name/i}).clear();

        await this.page.getByRole('textbox', {name: /iata code/i}).fill(' ');
        await this.page.getByRole('textbox', {name: /iata code/i}).clear();

        await this.page.getByRole('checkbox').first().click();
        await this.page.getByRole('checkbox').first().click();
    }

    public async performSnapshotAnalysis(snapshotTitle: string, config: AssertSnapshotConfig) {
        await this.assertSnapshots(snapshotTitle, config);
    }
}
