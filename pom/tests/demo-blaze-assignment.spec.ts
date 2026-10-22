import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { URLS,CREDENTIALS } from '../data/constants'

test.describe('Demo Blaze Assignment', () => {

    test('Login as a Standard user', async ({ page }) => {
        const homePage = new HomePage(page)
        
        await page.goto(URLS.BASE_URL)
        await homePage.loginLink.click()
        await homePage.usernameInput.fill(CREDENTIALS.STANDARD_USER.USERNAME)
        await homePage.passwordInput.fill(CREDENTIALS.STANDARD_USER.PASSWORD)
        await homePage.loginButton.click()
        // await homePage.attemptLogin(CREDENTIALS.STANDARD_USER.USERNAME,CREDENTIALS.STANDARD_USER.PASSWORD)
        await expect(homePage.welcomeUserLabel).toBeVisible()
    })

    test('Add product to shopping cart', async ({ page }) => {
        const homePage = new HomePage(page)
        const productName = 'Nokia lumia 1520'
        
        await page.goto(URLS.BASE_URL)
        await page.getByRole('link', { name: productName }).click()
        page.on('dialog', dialog => dialog.accept());
        await homePage.addToCartButton.click()
        await homePage.cartLink.click()
        // await homePage.addProduct(productName)
        await expect(page.getByRole('cell', { name: productName })).toBeVisible()
    })
}) 