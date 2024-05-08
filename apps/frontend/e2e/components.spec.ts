import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Log in' }).click();

  await page
    .getByLabel('Email address*')
    .fill(process.env.PLAYWRIGHT_USER || '');
  await page
    .getByLabel('Password*')
    .fill(process.env.PLAYWRIGHT_PASSWORD || '');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page).toHaveURL('/');
  await page.getByText('Components').click();
  await expect(page).toHaveURL('/components');
});

test('can see components', async ({ page }) => {
  await expect(page).toHaveURL('/components');
});
