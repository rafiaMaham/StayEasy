import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the signin button

  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("hena@gmail.com");
  await page.locator("[name=password]").fill("hena123");

  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name = name]").fill("Test Hotel");

  await page.locator("[name=country]").fill("Test country");

  await page.locator("[name = city]").fill("Test city");

  await page.locator("[name = description]").fill("test description");

  await page.locator("[name = pricePerNight]").fill("5780");

  await page.selectOption("select[name = starRating]", "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Parking").check();
  await page.getByLabel("Fitness center").check();

  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name = childCount]").fill("4");

  await page.setInputFiles("[name = imageFiles]", [
    path.join(__dirname, "files", "r1.jpg"),
    path.join(__dirname, "files", "r2.jpg"),
    path.join(__dirname, "files", "r3.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("test-test-test")).toBeVisible();
  await expect(page.getByText("delhi, india")).toBeVisible();
  await expect(page.getByText("Luxury")).toBeVisible();
  await expect(page.getByText("1000 per night")).toBeVisible();
  await expect(page.getByText("3 adults, 1 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getways UPDATED"
  );
  await page.locator('[name="name"]').fill("Dublin Getways back");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getways back"
  );
  await page.locator('[name="name"]').fill("Dublin Getways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
});
