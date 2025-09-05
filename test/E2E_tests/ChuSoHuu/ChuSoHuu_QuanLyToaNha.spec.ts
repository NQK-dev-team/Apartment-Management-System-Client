import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});
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
test('Building-List-1', async ({ page }) => {
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
  await page.getByTitle('-09-01').locator('div').click(); //will need to be update manually
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
  await page.getByTitle('-09-01').locator('div').click(); //will need to be update manually
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

test('Delete-Building-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.waitForTimeout(250); // the delay is needed for the elements to load properly
  // Click the <span> inside the second <li> of .ant-card-actions
  await page.locator('.ant-card-actions li').nth(1).locator('span > span[role="img"][aria-label="delete"]').click();
  await page.waitForTimeout(250);
  await page.getByRole('button', { name: 'Delete' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.waitForTimeout(250);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(250);
});

test('Building-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 4 ← Previous' }).click();
});

test('Room-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Room list' }).click();
  await page.getByRole('heading', { name: 'Room list' }).click();
});

test('Room-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Room list' }).click();
  await page.getByRole('heading', { name: 'Room list' }).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
});

test('Service-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Service list' }).click();
  await page.getByRole('heading', { name: 'Service list' }).click();
});

test('Service-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Service list' }).click();
  await page.getByRole('heading', { name: 'Service list' }).click();
});

test('Service-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Service list' }).click();
  await page.getByRole('heading', { name: 'Service list' }).click();
  await page.getByText('Service price (VND/month)').click();
  await page.getByText('Service price (VND/month)').click();
  await page.getByText('Service price (VND/month)').click();
});

test('Schedule-View-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Management schedule' }).click();
  await page.getByRole('heading', { name: 'Management schedule' }).click();
});

test('Statistic-View-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
  await page.getByText('Total building').click();
  await page.getByText('Total room').click();
  await page.getByText('Total customer').click();
});

test('Adjust-Building-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building', exact: true }).click();
  await page.getByRole('link', { name: 'Building name 1 ← Previous' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).fill('Building name 24');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Select floor').first().click();
  await page.locator('#select_floor_2_1').getByText('1').click();
  await page.getByRole('row', { name: '1003 Maintenance 0 Room' }).getByPlaceholder('Enter room area').click();
  await page.getByRole('row', { name: '1003 Maintenance 0 Room' }).getByPlaceholder('Enter room area').fill('30');
  await page.locator('div').filter({ hasText: /^Floor 1$/ }).locator('div').nth(2).click();
  await page.locator('#select_floor_2_8').getByText('8').click();
  await page.getByRole('row', { name: '8002 Rented 0 Room' }).getByPlaceholder('Enter room area').click();
  await page.getByRole('row', { name: '8002 Rented 0 Room' }).getByPlaceholder('Enter room area').fill('30');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByLabel('Confirm update').getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByLabel('Please enter your password to').getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('heading', { name: 'Building Building name' }).click();
});


test('Adjust-Building-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building', exact: true }).click();
  await page.getByRole('link', { name: 'Building name 2 ← Previous' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Select floor').first().click();
  await page.locator('#select_floor_2_1').getByText('1').click();
  await page.getByRole('row', { name: '1001 Rented 44 Room' }).getByPlaceholder('Enter room area').click();
  await page.getByRole('row', { name: '1001 Rented 44 Room' }).getByPlaceholder('Enter room area').fill('0');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Room 1001 area must be').click();
});

test('Adjust-Building-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building', exact: true }).click();
  await page.getByRole('link', { name: 'Building name 2 ← Previous' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Building name Asterisk' }).fill('');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByText('Building name cannot be empty!').click();
});