import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 900,
    width: 1600
  }
});

test('Service-List-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test30@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('heading', { name: 'Room list' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByTitle('Notice').click();
  await page.getByRole('link', { name: 'Inbox' }).click();
  await page.locator('#notification_1').getByText('Send time: 8 months ago').click();
});

test('Service-List-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test30@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('heading', { name: 'Room list' }).click();
  await page.getByRole('link', { name: 'Contract' }).click();
  await page.getByRole('link', { name: 'Billing' }).click();
  await page.getByTitle('Notice').click();
  await page.getByRole('link', { name: 'Inbox' }).click();
  await page.locator('#notification_1').getByText('Send time: 8 months ago').click();
});

test('Add-Ticket-1', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test26@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('button', { name: 'Add contract' }).click();
  await page.getByRole('combobox', { name: 'Building *' }).click();
  await page.locator('#building_name_1').click();
  await page.getByRole('combobox', { name: 'Floor *' }).click();
  await page.locator('#room_floor_1').getByText('9').click();
  await page.getByRole('combobox', { name: 'Room number*' }).click();
  await page.locator('#room_no_1 .ant-select-item-option-content', { hasText: '9006' }).click();
  await page.getByRole('textbox', { name: 'Title*' }).click();
  await page.getByRole('textbox', { name: 'Title*' }).fill('The RENT IS TOO HIGH');
  await page.getByRole('textbox', { name: 'Content*' }).click();
  await page.getByRole('textbox', { name: 'Content*' }).fill('LOWER THE RENT!');
  await page.getByRole('button', { name: 'Create support ticket' }).click();
  await page.getByText('Support ticket created').click();
  await page.locator('#view_ticket_1').click();
  await page.waitForTimeout(1000);
});

test('Add-Ticket-2', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test26@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('button', { name: 'Add contract' }).click();
  await page.getByRole('button', { name: 'Create support ticket' }).click();
  await page.getByText('Please select a building').click();
  await page.getByText('Please select a floor').click();
  await page.getByText('Please select a room').click();
  await page.getByText('Ticket title cannot be empty!').click();
  await page.getByText('Ticket content cannot be').click();
  await page.locator('#closeAddTicketModalButton').click();
});

test('Add-Ticket-3', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test26@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Support ticket' }).click();
  await page.getByRole('button', { name: 'Add contract' }).click();
  await page.getByRole('button', { name: 'Create support ticket' }).click();
  await page.getByText('Please select a building').click();
  await page.getByText('Please select a floor').click();
  await page.getByText('Please select a room').click();
  await page.getByText('Ticket title cannot be empty!').click();
  await page.getByText('Ticket content cannot be').click();
  await page.locator('#closeAddTicketModalButton').click();
});