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