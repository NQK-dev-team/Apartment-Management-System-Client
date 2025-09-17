import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});
test('Employee-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('heading', { name: 'Employee list' }).click();
//   await page.waitForTimeout(1000);
});

test('Employee-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('heading', { name: 'Employee list' }).click();
});

test('Employee-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('heading', { name: 'Employee list' }).click();
  await page.getByRole('listitem', { name: '2' }).locator('a').click();
});

test('Employee-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('heading', { name: 'Employee list' }).click();
  await page.locator('#customer_staff_1_link').click();
});

test('Delete-Employee-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('row').nth(1).getByLabel('').check();
  await page.getByRole('button', { name: 'Delete employee' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Employee-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('row').nth(1).getByLabel('').check();
  await page.getByRole('row').nth(2).getByLabel('').check();
  await page.getByRole('row').nth(3).getByLabel('').check();
  await page.getByRole('button', { name: 'Delete employee' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Delete-Employee-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('checkbox', { name: 'Select all' }).check();
  await page.getByRole('button', { name: 'Delete employee' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Delete success!').click();
});

test('Add-Employee-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Pen');
  await page.getByRole('textbox', { name: 'Middle name' }).click();
  await page.getByRole('textbox', { name: 'Middle name' }).fill('Pal');
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('PENPALPENAL');
  await page.getByRole('textbox', { name: 'Date of birth *' }).click();
  await page.getByRole('button', { name: '2025' }).click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.getByText('2000', { exact: true }).click();
  await page.getByText('Nov').click();
  await page.getByTitle('-11-30').locator('div').click();
  await page.getByRole('combobox', { name: 'Gender *' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).fill('092200005467');
  await page.getByRole('textbox', { name: 'Place of birth *' }).click();
  await page.getByRole('textbox', { name: 'Place of birth *' }).fill('Binh DINH');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0932758567');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('tohealth2@gmail.com');
  await page.getByRole('textbox', { name: 'Permanent address *' }).click();
  await page.getByRole('textbox', { name: 'Permanent address *' }).fill('Binh PENTHOUSE');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please enter employee').click();
  await page.getByText('Please choose an image!').first().click();
  await page.getByText('Please choose an image!').nth(1).click();
  await page.getByText('Please choose an image!').nth(2).click();
  await page.getByRole('textbox', { name: 'Temporary residence address *' }).click();
  await page.getByRole('textbox', { name: 'Temporary residence address *' }).fill('BINH DINH PENTHOUSE');
  await page.locator('input[type="file"]').first().setInputFiles('public/image/slipperDog.jpg');
  await page.locator('input[type="file"]').nth(1).setInputFiles('public/image/slipperDog.jpg');
  await page.locator('input[type="file"]').nth(2).setInputFiles('public/image/slipperDog.jpg');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('heading', { name: 'Finish' }).click();
  await page.getByText('You can access the newly').click();
  await page.getByRole('button', { name: 'New staff detail' }).click();
  await page.getByRole('heading', { name: 'Pen Pal PENPALPENAL' }).click();
});

test('Add-Employee-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Pen');
  await page.getByRole('textbox', { name: 'Middle name' }).click();
  await page.getByRole('textbox', { name: 'Middle name' }).fill('Pal');
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('PENPALPENAL');
  await page.getByRole('textbox', { name: 'Date of birth *' }).click();
  await page.getByRole('button', { name: '2025' }).click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.getByText('2000', { exact: true }).click();
  await page.getByText('Nov').click();
  await page.getByTitle('-11-30').locator('div').click();
  await page.getByRole('combobox', { name: 'Gender *' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).fill('092200005467');
  await page.getByRole('textbox', { name: 'Place of birth *' }).click();
  await page.getByRole('textbox', { name: 'Place of birth *' }).fill('Binh DINH');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0932758567');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('tohealth2@gmail.com');
  await page.getByRole('textbox', { name: 'Permanent address *' }).click();
  await page.getByRole('textbox', { name: 'Permanent address *' }).fill('Binh PENTHOUSE');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please enter employee').click();
  await page.getByText('Please choose an image!').first().click();
  await page.getByText('Please choose an image!').nth(1).click();
  await page.getByText('Please choose an image!').nth(2).click();
});

test('Add-Employee-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.getByRole('button', { name: 'Add employee' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Pen');
  await page.getByRole('textbox', { name: 'Middle name' }).click();
  await page.getByRole('textbox', { name: 'Middle name' }).fill('Pal');
  await page.getByRole('textbox', { name: 'Name *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Name *', exact: true }).fill('PENPALPENAL');
  await page.getByRole('textbox', { name: 'Date of birth *' }).click();
  await page.getByRole('button', { name: '2025' }).click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.locator('.ant-picker-header-super-prev-btn').click();
  await page.getByText('2000', { exact: true }).click();
  await page.getByText('Nov').click();
  await page.getByTitle('-11-30').locator('div').click();
  await page.getByRole('combobox', { name: 'Gender *' }).click();
  await page.getByText('Male', { exact: true }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).click();
  await page.getByRole('textbox', { name: 'SSN *' }).fill('092200005467');
  await page.getByRole('textbox', { name: 'Place of birth *' }).click();
  await page.getByRole('textbox', { name: 'Place of birth *' }).fill('Binh DINH');
  await page.getByRole('textbox', { name: 'Phone Number *' }).click();
  await page.getByRole('textbox', { name: 'Phone Number *' }).fill('0932758567');
  await page.getByRole('textbox', { name: 'Email *' }).click();
  await page.getByRole('textbox', { name: 'Email *' }).fill('tohealth2@gmail.com');
  await page.getByRole('textbox', { name: 'Permanent address *' }).click();
  await page.getByRole('textbox', { name: 'Permanent address *' }).fill('Binh PENTHOUSE');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Please enter employee').click();
  await page.getByText('Please choose an image!').first().click();
  await page.getByText('Please choose an image!').nth(1).click();
  await page.getByText('Please choose an image!').nth(2).click();
});

test('Adjust-Employee-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Staff' }).click();
  await page.locator('#customer_staff_1_link').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByText('Edit mode has been activated').click();
  // Select the checkbox input in the first data row (not the header)
  await page.locator('tbody tr').nth(0).locator('input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'delete' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('button', { name: 'Save changes' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Password Asterisk' }).fill('123456');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('Update success!').click();
});