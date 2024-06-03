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
  await expect(page.getByText('AMD Ryzen 7 7800X3D')).toBeTruthy();
});

test('can import components', async ({ page }) => {
  await expect(page).toHaveURL('/components');
  await page.getByText('Import').click();
  await expect(page).toHaveURL('/components/create');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByLabel('Select files').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(`${__dirname}/testData/component/cpu.csv`);
  await expect(page.getByText('CPU')).toBeTruthy();
  await page.getByRole('button', { name: 'Check for duplicates' }).click();
  await expect(page.getByText('426').nth(1)).toBeTruthy();
  await page.getByRole('button', { name: 'Import all components' }).click();
  await expect(page.getByText('Components imported')).toBeTruthy();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page).toHaveURL('/components');
});
