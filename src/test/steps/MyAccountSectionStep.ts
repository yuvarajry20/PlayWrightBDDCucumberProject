import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pagefixture';
import MyAccountSectionPage from '../../pages/MyAccountSectionPage';
import LoginPage from '../../pages/LoginPage';

let loginPage: LoginPage;
let accountPage: MyAccountSectionPage;

When('I provide email and password', async function (dataTable) {
  const rows = dataTable.rows(); // returns 2D array
  const email = rows[0][0];
  const password = rows[0][1];

  loginPage = new LoginPage(pageFixture.page!);
  accountPage = new MyAccountSectionPage(pageFixture.page!);

  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  await pageFixture.logger?.info(`Entered credentials - Email: ${email}`);
});

When('I click my email', async function () {
  await accountPage.clickMyEmail();
  await pageFixture.logger?.info('Clicked on user email link');
});

Then('I want to click change Password', async function () {
  await accountPage.clickChangePassword();
  await pageFixture.logger?.info('Navigated to Change Password section');
});

When('i provide oldPassword as {string}', async function (oldPassword: string) {
  await accountPage.enterOldPassword(oldPassword);
  await pageFixture.logger?.info('Entered old password');
});

When('i provide newPassword as {string} and confirmPassword as {string}', async function (newPassword: string, confirmPassword: string) {
  await accountPage.enterNewAndConfirmPassword(newPassword, confirmPassword);
  await pageFixture.logger?.info('Entered new and confirm password');
});

Then('i click change Password {string}', async function (expectedMessage: string) {
  try {
    await accountPage.clickChangePasswordButton();

    const page = pageFixture.page!;
    let actualMessage = '';

    if (expectedMessage.includes('Password was changed')) {
      const locator = page.locator('//div[@class="result"]');
      await expect(locator).toBeVisible({ timeout: 5000 });
      actualMessage = await locator.textContent() ?? '';
      expect(actualMessage.trim()).toBe(expectedMessage);
    } else {
      const locator = page.locator('//li[text()="Old password doesn\'t match"]');
      await expect(locator).toBeVisible({ timeout: 5000 });
      actualMessage = await locator.textContent() ?? '';
      expect(actualMessage.trim()).toBe(expectedMessage);
    }

    await pageFixture.logger?.info(`Verified password change message: ${actualMessage}`);
  } catch (error) {
    await pageFixture.logger?.error(`Failed to verify password change message. Error: ${error}`);
    throw error;
  }
});


When('i provide invalid oldPassword as {string}', async function (invalidOld: string) {
  await accountPage.enterOldPassword(invalidOld);
  await pageFixture.logger?.info('Entered invalid old password');
});

When('i click orders', async function () {
  await accountPage.clickOrders();
  await pageFixture.logger?.info('Clicked on Orders link');
});

Then('i want to see Order number', async function () {
  const orderNumber = await accountPage.getOrderNumber();
  console.log(`Order Number: ${orderNumber}`);
  await pageFixture.logger?.info(`Fetched Order Number: ${orderNumber}`);
});

Then('i want to see Order Date', async function () {
  const orderDate = await accountPage.getOrderDate();
  console.log(`Order Date: ${orderDate}`);
  await pageFixture.logger?.info(`Fetched Order Date: ${orderDate}`);
});

When('i click Details', async function () {
  await accountPage.clickOrderDetails();
  await pageFixture.logger?.info('Clicked on Order Details button');
});

Then('i want to see Products name', async function () {
  const product = await accountPage.getProductName();
  console.log(`Product Name: ${product}`);
  await pageFixture.logger?.info(`Fetched Product Name: ${product}`);
});

When('i click Back in stock subscriptions', async function () {
  await accountPage.clickBackInStock();
  await pageFixture.logger?.info('Navigated to Back in Stock Subscriptions');
});

Then('i should see the currently subscribed lists', async function () {
  const text = await accountPage.getBackInStockText();
  console.log(`Back in Stock Text: ${text}`);
  await pageFixture.logger?.info(`Fetched Back in Stock Message: ${text}`);
});

When('i click Reward points', async function () {
  await accountPage.clickRewardPoints();
  await pageFixture.logger?.info('Clicked on Reward Points link');
});

Then('i should see the current balance of Reward points', async function () {
  const balance = await accountPage.getRewardPointsBalance();
  console.log(`Reward Points Balance: ${balance}`);
  await pageFixture.logger?.info(`Fetched Reward Points Balance: ${balance}`);
});

Then('i should see the History', async function () {
  const history = await accountPage.getRewardPointsHistory();
  console.log(`Reward Points History: ${history}`);
  await pageFixture.logger?.info(`Fetched Reward Points History: ${history}`);
});

When('i click the Customer Info', async function () {
  await accountPage.clickCustomerInfo();
  await pageFixture.logger?.info('Navigated to Customer Info section');
});

Then('i should see the FirstName, LastName and Email', async function () {
  const details = await accountPage.getCustomerDetails();
  console.log(`First Name: ${details.firstName}`);
  console.log(`Last Name: ${details.lastName}`);
  console.log(`Email: ${details.email}`);
  await pageFixture.logger?.info(`Fetched Customer Info: ${JSON.stringify(details)}`);
});
