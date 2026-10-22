import { Locator, Page } from "@playwright/test"
import { CREDENTIALS } from "../data/constants"

export class HomePage {
    readonly page: Page
    readonly loginLink: Locator
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    readonly welcomeUserLabel: Locator
    readonly cartLink: Locator
    readonly addToCartButton: Locator

    constructor(page: Page){
        this.page = page
        this.loginLink = page.getByRole('link', { name: 'Log in' })
        this.usernameInput = page.locator('#loginusername')
        this.passwordInput = page.locator('#loginpassword')
        this.loginButton = page.getByRole('button', { name: 'Log in' })
        this.welcomeUserLabel = page.getByRole('link', { name: 'Welcome ' + CREDENTIALS.STANDARD_USER.USERNAME })
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true })
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' })
    }

    async attemptLogin(username: string, password: string){
        await this.loginLink.click()
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async addProduct(product: string){
        await this.page.getByRole('link', { name: product }).click()
        this.page.on('dialog', dialog => dialog.accept())
        await this.addToCartButton.click()
        await this.cartLink.click()
    }
}