import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Login-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test('Login-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('12345');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Invalid email or password!').click();
});

test('Login-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Please enter your password!').click();
});


test('Logout-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('img', { name: 'avatar' }).click();
  await page.getByText('Log out').click();
  await page.getByRole('heading', { name: 'NQK Management' }).click();
});

test('Recover-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Recovery email' }).fill('test1@gmail.com');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('An email has been sent to').click();
  await page.getByRole('button', { name: 'OK' }).click();
});

test('Recover-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('textbox', { name: 'Recovery email' }).fill('test1@gmail.com');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('An email has been sent to').click();
  await page.getByRole('button', { name: 'OK' }).click();
});