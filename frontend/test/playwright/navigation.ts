import {Page} from '@playwright/test';

export const goTo = async (page: Page, url: string) => {
    await page.goto(url);
};
