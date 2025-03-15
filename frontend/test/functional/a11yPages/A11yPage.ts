import {Locator, Page, expect} from '@playwright/test';

export class A11yPage {
    page: Page;

    private readonly KEYS = {
        navigateToPrevElement: 'Shift+Tab',
        navigateToNextElement: 'Tab',
        navigateToPrevGroupElement: 'ArrowUp',
        navigateToNextGroupElement: 'ArrowDown',
        selection: 'Space',
        action: 'Enter',
    };

    public constructor(page: Page) {
        this.page = page;
    }

    public getFocusedElement() {
        return this.page.locator('*:focus') as NotClickableLocator;
    }

    public async navigateToPrevElement() {
        await this.page.press('body', this.KEYS.navigateToPrevElement);
    }

    public async navigateToNextElement() {
        await this.page.press('body', this.KEYS.navigateToNextElement);
    }

    public async navigateToPrevGroupElement() {
        await this.page.press('body', this.KEYS.navigateToPrevGroupElement);
    }

    public async navigateToNextGroupElement() {
        await this.page.press('body', this.KEYS.navigateToNextGroupElement);
    }

    public async performAction() {
        await this.page.press('body', this.KEYS.action);
    }

    public async selectFocusedElement() {
        await this.page.press('body', this.KEYS.selection);
    }

    public async assertFocusedElement(expectedElement: Locator) {
        expect(await this.getOuterHtml(this.getFocusedElement())).toStrictEqual(await this.getOuterHtml(expectedElement));
    }

    private async getOuterHtml(element: Locator) {
        return await element.evaluate((node) => node.outerHTML);
    }

    public async assertFocusedElementHasText(text: string | RegExp) {
        await expect(this.getFocusedElement()).toHaveText(text);
    }

    public async assertFocusedElementHasValue(value: string | RegExp) {
        await expect(this.getFocusedElement()).toHaveValue(value);
    }

    public async assertNoFocus() {
        await expect(this.getFocusedElement()).toHaveCount(0);
    }
}

type NotClickableLocator = Locator & {
    click: never;
    chceck: never;
    dblclick: never;
    dragTo: never;
    hover: never;
    setChecked: never;
    tap: never;
    uncheck: never;
};
