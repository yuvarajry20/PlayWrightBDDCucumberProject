import { Page, Locator, expect } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/Playwrightwrapper';

export default class LoginPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  // Element locators
  private elements = {
    loginLink: "//a[text()='Log in']",
    emailField: "//a[text()='Log in']/ancestor::div/descendant::input[@id='Email']",
    passwordField: "//a[text()='Log in']/ancestor::div/descendant::input[@id='Password']",
    loginButton: "//a[text()='Log in']/ancestor::div/descendant::input[@class='button-1 login-button']",
    forgotPasswordLink: "//a[text()='Log in']/ancestor::div//a[text()='Forgot password?']",
    recoverButton: "//input[@name='send-email']",
    resultMessage: "//div[contains(@class, 'message-error') or contains(@class, 'result')]"
  };

  async navigateTo(url: string) {
    await this.base.goto(url);
  }

  async clickLoginLink() {
    await this.base.waitAndClick(this.elements.loginLink);
  }

  async enterEmail(email: string) {
    await this.page.locator(this.elements.emailField).fill(email);
  }

  async enterPassword(password: string) {
    await this.page.locator(this.elements.passwordField).fill(password);
  }

  async clickLoginButton() {
    await this.base.waitAndClick(this.elements.loginButton);
  }

  async clickForgotPasswordLink() {
    await this.base.waitAndClick(this.elements.forgotPasswordLink);
  }

  async clickRecoverButton() {
    await this.base.waitAndClick(this.elements.recoverButton);
  }

  async getResultText(): Promise<string> {
    const message = this.page.locator(this.elements.resultMessage).first();
    await expect(message).toBeVisible({ timeout: 5000 });
    return await message.textContent() ?? '';
  }

  async verifyLoginSuccess(expectedText: string) {
    const body = this.page.locator('body');
    await expect(body).toContainText(expectedText);
  }
}
