import { test, expect } from '@playwright/test';

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
test('test_building_list_1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Building' }).click();
});