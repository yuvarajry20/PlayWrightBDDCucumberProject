import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';
import LoginPage from '../../pages/LoginPage';

let loginPage: LoginPage;

Given('I want to be in the demowebshop',{ timeout: 20000 }, async function () {
  const baseUrl = process.env.BASEURL;
  if (!baseUrl) {
    throw new Error('BASEURL is not defined in the environment variables.');
  }

  loginPage = new LoginPage(pageFixture.page!);
  await loginPage.navigateTo(baseUrl);
  await pageFixture.logger?.info(`Navigated to: ${baseUrl}`);
});


When('I click on login', async function () {
  await loginPage.clickLoginLink();
  await pageFixture.logger?.info('Clicked on login link');
});

When('I enter {string},{string} in the appropriate field', async function (email: string, password: string) {
  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  await pageFixture.logger?.info(`Entered Email: ${email} and Password`);
});

When('I click on the login button', async function () {
  await loginPage.clickLoginButton();
  await pageFixture.logger?.info('Clicked on login button');
});

Then('the login result should be {string}', async function (expectedResult: string) {
  let locator;

  if (expectedResult.includes('@')) {
    // Successful login - check for username link
    locator = pageFixture.page!.locator(`//a[text()='${expectedResult}']`);
  } else if (expectedResult.includes('The credentials provided are incorrect')) {
    locator = pageFixture.page!.locator("//li[text()='The credentials provided are incorrect']");
  } else if (expectedResult.includes('No customer account found')) {
    locator = pageFixture.page!.locator("//li[text()='No customer account found']");
  } else {
    throw new Error(`Unexpected result message: ${expectedResult}`);
  }

  const actualText = await locator.textContent();
  await expect(actualText?.trim()).toBe(expectedResult);
  await pageFixture.logger?.info(`Login result verified: ${actualText}`);
});


When('I click on Forgot password', async function () {
  await loginPage.clickForgotPasswordLink();
  await pageFixture.logger?.info('Clicked on Forgot password link');
});

When('I enter {string} in the email field', async function (email: string) {
  await loginPage.enterEmail(email);
  await pageFixture.logger?.info(`Entered recovery email: ${email}`);
});

When('I click on the recover button', async function () {
  await loginPage.clickRecoverButton();
  await pageFixture.logger?.info('Clicked on recover button');
});

Then('the result message should be {string}', async function (expectedResult: string) {
  let locator;

  if (expectedResult.includes("Email with instructions has been sent to you.")) {
    locator = pageFixture.page!.locator('.result');
  } else if (expectedResult.includes("Email not found.")) {
    locator = pageFixture.page!.locator('.result');
  } else if (expectedResult.includes("Wrong email")) {
    locator = pageFixture.page!.locator("//span[text()='Wrong email']");
  } else {
    throw new Error(`Unexpected result message: ${expectedResult}`);
  }

  const actualText = await locator.textContent();
  await expect(actualText?.trim()).toBe(expectedResult);
  await pageFixture.logger?.info(`Recovery result verified: ${actualText}`);
});

