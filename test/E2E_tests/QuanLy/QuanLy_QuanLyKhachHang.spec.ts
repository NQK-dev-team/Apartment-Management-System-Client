import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Customer-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
});

test('Customer-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
});

test('Customer-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
  await page.getByRole('cell', { name: '50', exact: true }).click();
});

test('Customer-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
  await page.getByRole('cell', { name: '50', exact: true }).click();
  await page.goto('http://localhost:3000/customer');
  await page.locator('tr:nth-child(5) > td:nth-child(8)').click({
    button: 'middle'
  });
  await page.locator('#customer_detail_1_link').click();
  await page.getByText('Customer number').click();
});

test('Add-Customer-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:3000/customer/add');
  await page.getByRole('textbox', { name: 'Date of birth *'}).waitFor({ state: 'visible' });
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Date of birth *' }).click();
  const dobInput = page.getByRole('textbox', { name: 'Date of birth *' });
  await dobInput.fill('2000-02-02');
  await dobInput.press('Enter');
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('YOURGOD');
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('SKAI');
  await page.getByRole('textbox', { name: 'Middle name' }).click();
  await page.getByRole('textbox', { name: 'Middle name' }).fill('IS');
  await page.getByRole('combobox', { name: 'Gender *' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).fill('092200002427');
  await page.getByRole('textbox', { name: 'Old SSN' }).click();
  await page.getByRole('textbox', { name: 'Place of birth *' }).click();
  await page.getByRole('textbox', { name: 'Place of birth *' }).fill('BINH DINH');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('09327584567');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0932758456');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('testmachine2025@gmail.com');
  await page.getByRole('textbox', { name: 'Permanent address *' }).click();
  await page.getByRole('textbox', { name: 'Permanent address *' }).fill('BINH DINH');
  await page.getByRole('textbox', { name: 'Temporary residence address *' }).click();
  await page.getByRole('textbox', { name: 'Temporary residence address *' }).fill('BINH DINH');
  // await page.locator('button').filter({ hasText: 'Upload file' }).first().click();
  // await page.locator('button').filter({ hasText: 'Upload file' }).first().setInputFiles('2025-08-23 18_55_50-YouPass.png');
  await page.locator('input[type="file"]').first().setInputFiles('public/image/building.jpg');
  await page.locator('input[type="file"]').nth(1).setInputFiles('public/image/building.jpg');
  await page.locator('input[type="file"]').nth(2).setInputFiles('public/image/building.jpg');
  // await page.locator('button').filter({ hasText: 'Upload file' }).nth(1).click();
  // await page.locator('button').filter({ hasText: 'Upload file' }).nth(1).setInputFiles('2025-08-23 18_55_50-YouPass.png');
  // await page.locator('button').filter({ hasText: 'Upload file' }).nth(2).click();
  // await page.locator('button').filter({ hasText: 'Upload file' }).nth(2).setInputFiles('2025-08-23 18_55_50-YouPass.png');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'New customer detail' }).click();
});


test('Add-Customer-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:3000/customer');
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Phone number is not valid!').click();
  await page.getByText('Please enter customer last').click();
  await page.getByText('Please enter customer first').click();
  await page.getByText('Please select customer date').click();
  await page.getByText('Please select customer gender').click();
  await page.getByText('Please enter customer SSN').click();
  await page.getByText('Please enter customer place').click();
  await page.getByText('Please enter customer email').click();
  await page.getByText('Please enter customer permanent address').click();
  await page.getByText('Please enter customer temporary address').click();
  await page.getByText('Please choose an image!').first().click();
  await page.getByText('Please choose an image!').nth(1).click();
  await page.getByText('Please choose an image!').nth(2).click();
});

test('Add-Customer-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(1000);
  await page.goto('http://localhost:3000/customer');
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please enter customer last').click();
  await page.getByText('Please enter customer first').click();
  await page.getByText('Please select customer date').click();
  await page.getByText('Please select customer gender').click();
  await page.getByText('Please enter customer SSN').click();
  await page.getByText('Please enter customer phone').click();
  await page.getByText('Please enter customer place').click();
  await page.getByText('Please enter customer email').click();
  await page.getByText('Please enter customer permanent address').click();
  await page.getByText('Please enter customer temporary address').click();
  await page.getByText('Please choose an image!').first().click();
  await page.getByText('Please choose an image!').nth(1).click();
  await page.getByText('Please choose an image!').nth(2).click();
});

test('Delete-Customer-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByRole('row', { name: '1 Last name 750 First name' }).getByLabel('').check();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Customer-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByRole('row', { name: '1 Last name 991 First name' }).getByLabel('').check();
  await page.getByRole('row', { name: '2 Last name 820 First name' }).getByLabel('').check();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Customer-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  await page.getByRole('button', { name: 'Delete customer' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Search-Customer-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByRole('textbox', { name: 'Enter search value' }).click();
  await page.getByRole('textbox', { name: 'Enter search value' }).fill('29');
  await page.getByRole('textbox', { name: 'Enter search value' }).press('Enter');
  await page.getByRole('cell', { name: '00000029' }).click();
  await page.locator('#customer_detail_1_link').click();
});

test('Search-Customer-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Customer' }).click();
  await page.getByRole('textbox', { name: 'Enter search value' }).click();
  await page.getByRole('textbox', { name: 'Enter search value' }).fill('SUPERSTARBOWLING');
  await page.getByRole('textbox', { name: 'Enter search value' }).press('Enter');
  await page.getByText('No data').click();
});