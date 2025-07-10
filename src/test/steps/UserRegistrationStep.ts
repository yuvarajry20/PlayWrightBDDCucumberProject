import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import UserRegistrationPage from "../../pages/UserRegistrationPage";
import { pageFixture } from "../../hooks/pagefixture";

let registrationPage: UserRegistrationPage;

When('I click on register', async function () {
  registrationPage = new UserRegistrationPage(pageFixture.page!);
  await registrationPage.clickRegisterLink();
  await pageFixture.logger?.info("Clicked on Register link");
});

When('I choose gender', async function () {
  await registrationPage.chooseGender();
  await pageFixture.logger?.info("Selected gender");
});

When(
  'I enter {string},{string},{string},{string},{string} in the corresponding field',
  async function (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const dynamicEmail = email === "yuvabbb@gmail.com"
      ? `test${Date.now()}@example.com`
      : email;

    await registrationPage.fillRegistrationFields(
      firstName,
      lastName,
      dynamicEmail,
      password,
      confirmPassword
    );
    await pageFixture.logger?.info(`Entered registration data with email: ${dynamicEmail}`);
  }
);

When('I click on the register button', async function () {
  await registrationPage.clickRegisterButton();
  await pageFixture.logger?.info("Clicked on Register button");
});

Then('the registration result should be {string}', async function (expectedMessage: string) {
  const actualMessage = await registrationPage.getRegistrationResult();

  if (expectedMessage === "Your registration completed") {
    await expect(actualMessage).toContain(expectedMessage);
  } else {
    await expect(actualMessage).toBe(expectedMessage);
  }

  await pageFixture.logger?.info(`Verified registration result: ${actualMessage}`);
});
