import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.waitForTimeout(250);
  
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.waitForTimeout(250);
  
//   await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
//   await page.waitForTimeout(250);
  
//   await page.locator('.ant-input-affix-wrapper').click();
//   await page.waitForTimeout(250);
  
//   await page.getByRole('textbox', { name: 'Password' }).fill('123456');
//   await page.waitForTimeout(250);
  
//   await page.getByRole('button', { name: 'Log in' }).click();
//   await page.waitForTimeout(250);
  
//   await page.getByRole('link', { name: 'Building name 1 Building' }).click();
//   await page.waitForTimeout(250);
  
//   await page.getByRole('row', { name: '1 1 1001 Available 67 Room' }).getByRole('link').click();
//   await page.waitForTimeout(250);
  
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('row', { name: '1 Last name 1590 Middle name' }).getByRole('link').nth(2).click();
//   await page.waitForTimeout(250);
  
//   const page1 = await page1Promise;
//   await page1.locator('div').filter({ hasText: /^Contract$/ }).click();
// });
test('test_building_list_1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
});

test('Add-Building-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('div').filter({ hasText: /^Email$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('button', { name: 'plus' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).fill('Building 7');
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).fill('142/13/451 Nguyen Van Luong, p.5, q.6');
    // If it's the first file input on the page
  await page.locator('input[type="file"]').first().setInputFiles('public/image/building.jpg');
  await page.getByRole('button', { name: 'plus' }).first().click();
  await page.getByRole('textbox', { name: 'Enter service name' }).click();
  await page.getByRole('textbox', { name: 'Enter service name' }).fill('room cleaning');
  await page.getByRole('row', { name: 'room cleaning' }).getByPlaceholder('Enter service price').click();
  await page.getByRole('row', { name: 'room cleaning' }).getByPlaceholder('Enter service price').fill('200000');
  await page.getByRole('row', { name: '1 room cleaning' }).getByLabel('').check();
  await page.getByRole('button', { name: 'plus' }).nth(1).click();
  await page.locator('#schedule_1_manager_no_1').click();
  await page.getByText('- Last name 2 First name 2').click();
  await page.locator('.ant-picker-input').first().click();
  await page.getByTitle('-08-29').locator('div').click();
  await page.getByRole('cell', { name: 'calendar', exact: true }).locator('div').nth(3).click();
  await page.locator('div:nth-child(10) > div > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel-layout > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-next-btn').click();
  await page.getByRole('cell', { name: '22' }).locator('div').click();
  await page.getByRole('button', { name: 'plus' }).nth(2).click();
  await page.getByRole('button', { name: 'plus' }).nth(2).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'New building detail' }).click();
});

test('Add-Building-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('div').filter({ hasText: /^Email$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('button', { name: 'plus' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).fill('Building 7');
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).fill('142/13/451 Nguyen Van Luong, p.5, q.6');
  //   // If it's the first file input on the page
  await page.locator('input[type="file"]').first().setInputFiles('public/image/building.jpg');
  await page.getByRole('button', { name: 'plus' }).first().click();
  await page.getByRole('textbox', { name: 'Enter service name' }).click();
  await page.getByRole('textbox', { name: 'Enter service name' }).fill('ggg');
  await page.getByRole('row', { name: 'ggg' }).getByPlaceholder('Enter service price').click();
  await page.getByRole('row', { name: 'ggg' }).getByPlaceholder('Enter service price').fill('0');

  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Service 1 price must be').click();
});

test('Add-Building-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('div').filter({ hasText: /^Email$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('button', { name: 'plus' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).fill('Building 7');
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building address Asterisk' }).fill('142/13/451 Nguyen Van Luong, p.5, q.6');
  //   // If it's the first file input on the page
  // await page.locator('input[type="file"]').first().setInputFiles('public/image/building.jpg');
  await page.getByRole('button', { name: 'plus' }).first().click();
  await page.getByRole('textbox', { name: 'Enter service name' }).click();
  await page.getByRole('textbox', { name: 'Enter service name' }).fill('room cleaning');
  await page.getByRole('row', { name: 'room cleaning' }).getByPlaceholder('Enter service price').click();
  await page.getByRole('row', { name: 'room cleaning' }).getByPlaceholder('Enter service price').fill('200000');
  await page.getByRole('row', { name: '1 room cleaning' }).getByLabel('').check();
  await page.getByRole('button', { name: 'plus' }).nth(1).click();
  await page.locator('#schedule_1_manager_no_1').click();
  await page.getByText('- Last name 2 First name 2').click();
  await page.locator('.ant-picker-input').first().click();
  await page.getByTitle('-08-29').locator('div').click();
  await page.getByRole('cell', { name: 'calendar', exact: true }).locator('div').nth(3).click();
  await page.locator('div:nth-child(10) > div > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel-layout > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-next-btn').click();
  await page.getByRole('cell', { name: '22' }).locator('div').click();
  await page.getByRole('button', { name: 'plus' }).nth(2).click();
  await page.getByRole('button', { name: 'plus' }).nth(2).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(
    page.getByRole('button', { name: 'Confirm' })
  ).not.toBeVisible({ timeout: 5000 });
});






