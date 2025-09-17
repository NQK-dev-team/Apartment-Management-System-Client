import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.locator('[id="__nuxt"]').getByText('Profile').click();
});

test('Pass-Change-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByRole('link', { name: 'lock Security setting' }).click();
  await page.getByRole('textbox', { name: 'Current password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Current password Asterisk' }).fill('123456');
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).click();
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).fill('man123456');
  await page.getByRole('textbox', { name: 'Confirm new password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Confirm new password Asterisk' }).fill('man123456');
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).click();
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).fill('man123456N!');
  await page.getByRole('textbox', { name: 'Confirm new password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Confirm new password Asterisk' }).fill('man123456N!');
  await page.locator('#confirmChangePassword').click();
  await page.getByText('Update success!').click();
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByText('Log out').click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Invalid email or password!').click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('man123456N!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('heading', { name: 'Dashboard' }).click();
});

test('Pass-Change-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByRole('link', { name: 'lock Security setting' }).click();
  await page.getByRole('textbox', { name: 'Current password Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Current password Asterisk' }).fill('123456');
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).click();
  await page.getByRole('textbox', { name: 'New password Asterisk', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirm new password Asterisk' }).click();
  await page.getByText('Password must be at least 8').click();
});