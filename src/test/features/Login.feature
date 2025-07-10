Feature: Yuvaraj_10JUL2025_DemoWebShop_Validate Login

@Login
Scenario Outline: Login with valid and invalid credentials
  Given I want to be in the demowebshop
  When I click on login
  And I enter "<Email>","<Password>" in the appropriate field
  And I click on the login button
  Then the login result should be "<Result>"

Examples:
|Email           |Password     |Result                                |
|abccy@gmail.com |789456       |abccy@gmail.com                       |
|abccy@gmail.com |testuser1    |The credentials provided are incorrect|
|                |789456       |No customer account found             |
|abccy@gmail.com |             |The credentials provided are incorrect|

@ForgotPassword
Scenario Outline: Forgot password with valid and invalid email
  Given I want to be in the demowebshop
  When I click on login
  And I click on Forgot password
  And I enter "<Email>" in the email field
  And I click on the recover button
  Then the result message should be "<Result>"

Examples:
|Email                 |Result                                       |
|abccy@gmail.com       |Email with instructions has been sent to you.|
|divvvv@gmail.com      |Email not found.                             |
|@gmail.com            |Wrong email                                  |