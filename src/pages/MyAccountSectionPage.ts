import { Page, expect } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/Playwrightwrapper';

export default class MyAccountSectionPage {
  private base: PlaywrightWrapper;

  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  private elements = {
    customerInfoLink: "//div[@class='block block-account-navigation']//div[2]//ul//li[1]//a",
    firstName: "#FirstName",
    lastName: "#LastName",
    email: "#Email",

    ordersLink: "(//a[text()='Orders'])[1]",
    orderNumber: "(//a[text()='Orders']/following::div[@class='section order-item']//div)[1]",
    orderDate: "(//a[text()='Orders']/following::ul[@class='info']//li[2])[1]",
    orderDetailsButton: "(//a[text()='Orders']/following::input[@class='button-2 order-details-button'])[1]",
    productName: "//td[@class='a-left name']",

    backInStockLink: "//a[text()='Back in stock subscriptions']",
    backInStockMessage: "//div[@class='no-data']",

    rewardPointsLink: "//a[text()='Reward points']",
    rewardPointsBalance: "//a[text()='Reward points']/following::div[@class='current-balance']",
    rewardPointsHistory: "//a[text()='Reward points']/following::div[@class='reward-points-history']",

    changePasswordLink: "//a[text()='Change password']",
    oldPasswordField: "#OldPassword",
    newPasswordField: "#NewPassword",
    confirmPasswordField: "#ConfirmNewPassword",
    changePasswordButton: "//input[@class='button-1 change-password-button']",
    resultMessage: "//div[contains(@class,'message-error') or contains(@class,'result')]",

    myEmail: "//a[contains(text(), 'abccy@gmail.com')]"
  };

  // ============ Common ============
  async clickMyEmail() {
    await this.base.waitAndClick(this.elements.myEmail);
  }

  // ============ Customer Info ============
  async clickCustomerInfo() {
    await this.base.waitAndClick(this.elements.customerInfoLink);
  }

  async getFirstName(): Promise<string> {
    return await this.page.locator(this.elements.firstName).inputValue();
  }

  async getLastName(): Promise<string> {
    return await this.page.locator(this.elements.lastName).inputValue();
  }

  async getEmail(): Promise<string> {
    return await this.page.locator(this.elements.email).inputValue();
  }

  async getCustomerDetails() {
    return {
      firstName: await this.getFirstName(),
      lastName: await this.getLastName(),
      email: await this.getEmail()
    };
  }

  // ============ Orders ============
  async clickOrders() {
    await this.base.waitAndClick(this.elements.ordersLink);
  }

  async getOrderNumber(): Promise<string> {
    return await this.page.locator(this.elements.orderNumber).textContent() ?? '';
  }

  async getOrderDate(): Promise<string> {
    return await this.page.locator(this.elements.orderDate).textContent() ?? '';
  }

  async clickOrderDetails() {
    await this.base.waitAndClick(this.elements.orderDetailsButton);
  }

  async getProductName(): Promise<string> {
    return await this.page.locator(this.elements.productName).textContent() ?? '';
  }

  // ============ Back in Stock ============
  async clickBackInStockSubscriptions() {
    await this.base.waitAndClick(this.elements.backInStockLink);
  }

  // Alias for backward compatibility
  async clickBackInStock() {
    await this.clickBackInStockSubscriptions();
  }

  async getBackInStockText(): Promise<string> {
    return await this.page.locator(this.elements.backInStockMessage).textContent() ?? '';
  }

  // ============ Reward Points ============
  async clickRewardPoints() {
    await this.base.waitAndClick(this.elements.rewardPointsLink);
  }

  async getRewardPointsBalance(): Promise<string> {
    return await this.page.locator(this.elements.rewardPointsBalance).textContent() ?? '';
  }

  async getRewardPointsHistory(): Promise<string> {
    return await this.page.locator(this.elements.rewardPointsHistory).textContent() ?? '';
  }

  // ============ Change Password ============
  async clickChangePassword() {
    await this.base.waitAndClick(this.elements.changePasswordLink);
  }

  async enterOldPassword(oldPwd: string) {
    await this.page.locator(this.elements.oldPasswordField).fill(oldPwd);
  }

  async enterNewAndConfirmPassword(newPwd: string, confirmPwd: string) {
    await this.page.locator(this.elements.newPasswordField).fill(newPwd);
    await this.page.locator(this.elements.confirmPasswordField).fill(confirmPwd);
  }

  async clickChangePasswordButton() {
    await this.base.waitAndClick(this.elements.changePasswordButton);
  }

  async getChangePasswordResult(): Promise<string> {
    const msg = this.page.locator(this.elements.resultMessage).first();
    await expect(msg).toBeVisible({ timeout: 5000 });
    return await msg.textContent() ?? '';
  }

  async changePassword(oldPwd: string, newPwd: string, confirmPwd: string) {
    await this.enterOldPassword(oldPwd);
    await this.enterNewAndConfirmPassword(newPwd, confirmPwd);
    await this.clickChangePasswordButton();
  }
}
