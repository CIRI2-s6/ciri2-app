import { test, expect } from '@playwright/test';

test('can login', async ({ page }) => {
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
});

test('can logout', async ({ page }) => {
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

  await page.getByRole('button').click();
  await page.getByText('Logout').click();
});

test('can see component page', async ({ page }) => {
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
