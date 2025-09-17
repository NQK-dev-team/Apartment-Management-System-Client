import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Announcement-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Notice').click();
  await page.getByRole('link', { name: 'Sent' }).click();
  await page.getByRole('heading', { name: 'Sent notification' }).click();
});

test('Announcement-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Notice').click();
  await page.getByRole('link', { name: 'Sent' }).click();
  await page.getByRole('heading', { name: 'Sent notification' }).click();
});
test('Add-Announcement-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTitle('Notice').getByRole('img').nth(1).click();
  await page.getByRole('link', { name: 'New notification' }).click();
  await page.getByRole('heading', { name: 'New notification' }).click();
  await page.getByRole('textbox', { name: 'Title Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Title Asterisk' }).fill('More for me - Because I like it 3');
  await page.locator('#content div').first().click();
  await page.locator('#content div').first().fill('Give me money OR ELSE');
  await page.locator('#receiverCustomer').click();
  await page.getByRole('checkbox', { name: 'Choose all customers' }).check();
  await page.getByRole('listitem', { name: '2', exact: true }).locator('a').click();
  await page.getByRole('button', { name: 'Send notification' }).click();
  await page.getByText('Success', { exact: true }).click();
  await page.getByRole('link', { name: 'Sent' }).click();
});

test('Add-Announcement-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTitle('Notice').getByRole('img').nth(1).click();
  await page.getByRole('link', { name: 'New notification' }).click();
  await page.getByRole('textbox', { name: 'Title Asterisk' }).click();
  await page.getByRole('textbox', { name: 'Title Asterisk' }).fill('More for me - Because I like it 3');
  await page.locator('#content div').first().click();
  await page.locator('#content div').first().fill('Sent notif');
  await expect(page.getByRole('button', { name: 'Send notification' })).toBeDisabled();
});

test('Add-Announcement-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByTitle('Notice').getByRole('img').nth(1).click();
  await page.getByRole('link', { name: 'New notification' }).click();
  await page.locator('#receiverCustomer').click();
  await page.getByRole('cell', { name: 'Select all' }).click();
  await page.locator('#content div').first().click();
  await page.locator('#content div').first().fill('Sent notif');
  await expect(page.getByRole('button', { name: 'Send notification' })).toBeDisabled();
});