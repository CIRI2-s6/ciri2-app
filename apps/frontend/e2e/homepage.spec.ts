import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  await expect(
    page.getByRole('heading', { name: 'CIRI2', exact: true })
  ).toContainText('CIRI2');
});

test('has login button', async ({ page }) => {
  await page.goto('/');
  // Expect a button to contain a substring.
  await expect(page.getByRole('button', { name: 'Log in' })).toContainText(
    'Log in'
  );
});
