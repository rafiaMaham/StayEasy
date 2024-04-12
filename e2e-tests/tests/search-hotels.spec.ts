import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("hena@gmail.com");
  await page.locator("[name=password]").fill("hena123");

  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Delhi");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Delhi")).toBeVisible();
  await expect(page.getByText("Dublin Getways UPDATED")).toBeVisible();
});

