import { Page, expect } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/Playwrightwrapper';

export default class UserRegistrationPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private elements = {
    registerLink: "//a[@class='ico-login']/parent::li/preceding-sibling::li/a",
    clickMale: "//label[@class='forcheckbox']/preceding-sibling::input[@id='gender-male']",
    firstName: "//label[@for='FirstName']/following-sibling::input",
    lastName: "//label[@for='LastName']/following-sibling::input",
    email: "//label[@for='Email']/following-sibling::input",
    password: "//label[@for='Password']/following-sibling::input",
    confirmPassword: "//label[@for='ConfirmPassword']/following-sibling::input",
    registerButton: "#register-button",
    resultMessage: ".result, .field-validation-error span"
  };

  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async clickRegisterLink() {
    await this.base.waitAndClick(this.elements.registerLink);
  }

  async chooseGender() {
    await this.base.waitAndClick(this.elements.clickMale);
  }

  async fillRegistrationFields(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (firstName !== undefined) await this.page.locator(this.elements.firstName).fill(firstName);
    if (lastName !== undefined) await this.page.locator(this.elements.lastName).fill(lastName);
    if (email !== undefined) await this.page.locator(this.elements.email).fill(email);
    if (password !== undefined) await this.page.locator(this.elements.password).fill(password);
    if (confirmPassword !== undefined) await this.page.locator(this.elements.confirmPassword).fill(confirmPassword);
  }

  async clickRegisterButton() {
    await this.base.waitAndClick(this.elements.registerButton);
  }

  async getRegistrationResult(): Promise<string> {
    const result = await this.page.locator(this.elements.resultMessage).first();
    await expect(result).toBeVisible({ timeout: 5000 });
    return (await result.textContent())?.trim() ?? '';
  }
}
