import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Bill-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByRole('heading', { name: 'Billing list' }).click();
});

test('Bill-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByRole('heading', { name: 'Billing list' }).click();
});

test('Bill-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByRole('heading', { name: 'Billing list' }).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
});

test('Bill-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByRole('heading', { name: 'Billing list' }).click();
  await page.locator('#bill_1_detail_link').click();
  await page.getByRole('heading', { name: 'Billing payment' }).click();
  await page.getByRole('heading', { name: 'Billing information' }).click();
});

test('Add-Bill-1', async ({ page }) => {
await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.goto('http://localhost:3000/bill/add');
  await page.waitForTimeout(1000);
  await page.getByRole('combobox', { name: 'Building Asterisk' }).click();
  await page.locator('#building_name_3').getByText('Building name').click();
  await page.getByRole('combobox', { name: 'Floor Asterisk' }).click();
  await page.locator('#room_floor_5').getByText('5').click();
  await page.getByRole('combobox', { name: 'Room number Asterisk' }).click();
  await page.getByText('5005').click();
  await page.getByRole('textbox', { name: 'Billing name Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Billing name Asterisk' }).fill('Sup bill');
  await page.getByRole('textbox', { name: 'Payment period Asterisk' }).click();
  await page.getByText('Sep').click();
  await page.getByRole('button', { name: 'plus' }).click();
  await page.getByPlaceholder('Enter payment amount').click();
  await page.getByPlaceholder('Enter payment amount').fill('666666');
  await page.getByRole('textbox', { name: 'Enter payment name' }).click();
  await page.getByRole('textbox', { name: 'Enter payment name' }).fill('devil tax');
  await page.getByRole('textbox', { name: 'Enter payment name' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Enter payment name' }).press('Shift+ArrowLeft');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'New billing detail' }).click();
  await page.getByRole('heading', { name: 'Billing information' }).click();
  await page.getByRole('heading', { name: 'Sup bill' }).click();
});

test('Add-Bill-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('button', { name: 'Add bill' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please select a building').click();
  await page.getByText('Please select a floor').click();
  await page.getByText('Please select a room').click();
  await page.getByText('Contract ID cannot be empty!').click();
  await page.getByText('Billing name cannot be empty!').click();
});

test('Add-Bill-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('button', { name: 'Add bill' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please select a building').click();
  await page.getByText('Please select a floor').click();
  await page.getByText('Please select a room').click();
  await page.getByText('Contract ID cannot be empty!').click();
  await page.getByText('Billing name cannot be empty!').click();
});

test('Delete-Bill-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByTitle('2025-09').locator('div').click();
  await page.waitForTimeout(1000);
  // await page.getByRole('row', { name: '1 Building name 1 2 2003 62' }).getByLabel('').check();
  // Select the first row and check its checkbox
  await page.getByRole('row').nth(1).getByLabel('').check();
  await page.getByRole('button', { name: 'Delete bill' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Bill-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByTitle('2025-09').locator('div').click();
  await page.getByRole('cell', { name: 'Room number search' }).getByRole('button').click();
  await page.getByRole('cell', { name: 'Floor filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: '1', exact: true }).getByLabel('').check();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('row').nth(2).getByLabel('').check(); // second data row
  await page.getByRole('row').nth(3).getByLabel('').check(); // third data row
  await page.getByRole('row').nth(1).getByLabel('').check(); // first data row
  // await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Delete bill' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Bill-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByRole('textbox', { name: 'Start month' }).click();
  await page.getByTitle('2025-01').locator('div').click();
  await page.getByTitle('2025-09').locator('div').click();
  await page.waitForTimeout(1000);
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  await page.getByRole('button', { name: 'Delete bill' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

