import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});
test('Ticket-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByRole('button', { name: 'Jul' }).click();
  await page.getByText('Jan').click();
  await page.getByTitle('-01-01').locator('div').click();
  await page.locator('div').filter({ hasText: /^5$/ }).nth(2).click();
});

test('Ticket-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
});

test('Ticket-List-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByRole('button', { name: 'Jul' }).click();
  await page.getByText('Jan').click();
  await page.getByTitle('-01-01').locator('div').click();
  await page.locator('div').filter({ hasText: /^5$/ }).nth(2).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
});

test('Ticket-Approve-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByRole('button', { name: 'Jul' }).click();
  await page.getByText('Jan').click();
  await page.getByTitle('-01-01').locator('div').click();
  await page.locator('div').filter({ hasText: /^5$/ }).nth(2).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Pending' }).getByLabel('').check();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('#approve_ticket_1 svg').click();
  await page.locator('#deny_ticket_1 svg').click();
  await page.getByText('Update support ticket').click();
});

test('Ticket-Deny-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByRole('button', { name: 'Jul' }).click();
  await page.getByText('Jan').click();
  await page.getByTitle('-01-01').locator('div').click();
  await page.locator('div').filter({ hasText: /^5$/ }).nth(2).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Pending' }).getByLabel('').check();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('#deny_ticket_1 svg').click();
  await page.getByText('Update support ticket').click();
});

test('Ticket-Info-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByRole('button', { name: 'Jul' }).click();
  await page.getByText('Jan').click();
  await page.getByTitle('-01-01').locator('div').click();
  await page.locator('div').filter({ hasText: /^5$/ }).nth(2).click();
  await page.getByText('/ page').click();
  await page.getByText('50 / page').click();
  await page.getByRole('cell', { name: 'Status filter' }).getByRole('button').click();
  await page.getByRole('menuitem', { name: 'Pending' }).getByLabel('').check();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('#view_ticket_1 svg').click();
  await page.getByText('Support ticket detail').click();
  await page.locator('#closeTicketDetailModalButton').click();
});