import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

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

test('Building-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
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
});

test('Room-List-3', async ({ page }) => {
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

test('Room-Info-1', async ({ page }) => {
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
    await page.locator('#room_1_detail_link').click();
    await page.getByRole('heading', { name: 'Room' }).click();
});