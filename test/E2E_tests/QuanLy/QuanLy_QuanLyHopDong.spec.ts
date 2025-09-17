import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});


test('Contract-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('heading', { name: 'Contract list' }).click();
});

test('Contract-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('heading', { name: 'Contract list' }).click();
});

test('Contract-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('heading', { name: 'Contract list' }).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
});

test('Contract-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.locator('#contract_1_detail_link').click();
  await page.getByRole('heading', { name: 'Contract information' }).click();
  await page.getByRole('heading', { name: 'Paper list' }).click();
  await page.getByRole('heading', { name: 'Other resident list' }).click();
  await page.getByRole('heading', { name: 'Billing list' }).click();
});

test('Add-Contract-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('button', { name: 'Add contract' }).click();
  await page.getByRole('combobox', { name: 'Customer number Asterisk' }).click();
  await page.getByRole('combobox', { name: 'Customer number Asterisk' }).fill('dsaaa');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please select a customer').click();
});

test('Add-Contract-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('button', { name: 'Add contract' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please select a building').click();
  await page.getByText('Please select a floor').click();
  await page.getByText('Please select a room').click();
  await page.getByText('Please select a customer').click();
  await page.getByText('Please select a contract type').click();
  await page.getByText('Contract value cannot be').click();
  await page.getByText('Contract create date cannot').click();
  await page.getByText('Contract start date cannot be').click();
});

test('Delete-Contract-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('te');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Cancelled' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('row', { name: '2021 Building name 4 4 4008' }).getByLabel('', { exact: true }).check();
  await page.getByRole('row', { name: '2022 Building name 4 4 4008' }).getByLabel('', { exact: true }).check();
  await page.getByRole('button', { name: 'Delete contract' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('textbox', { name: 'Password Asterisk' }).press('Enter');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Contract-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('te');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Cancelled' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('row', { name: '2024 Building name 4 4 4009' }).getByLabel('', { exact: true }).check();
  await page.getByRole('row', { name: '2025 Building name 4 4 4009' }).getByLabel('', { exact: true }).check();
  await page.getByRole('button', { name: 'Delete contract' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('textbox', { name: 'Password Asterisk' }).press('Enter');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Contract-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('te');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).press('Shift+ArrowLeft');
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Cancelled' }).locator('span').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  await page.getByRole('button', { name: 'Delete contract' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('textbox', { name: 'Password Asterisk' }).press('Enter');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});