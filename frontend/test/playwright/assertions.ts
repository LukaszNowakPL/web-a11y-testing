import {Page, expect} from '@playwright/test';

export const assertIsOn = async (page: Page, path: string) => {
    await page.waitForURL((url) => url.pathname === `/${path}`);
    await expect(page).toHaveURL(`/${path}`);
};

export const assertHeaderContent = async (page: Page, expected: string | RegExp) => {
    const header = page.getByRole('heading', {level: 1});
    expect(await header.textContent()).toMatch(expected);
};
