// linkedin-scraper.service.ts
import { Global, Injectable } from '@nestjs/common';
import { WebDriver, Builder, Capabilities, By } from 'selenium-webdriver';

@Global()
@Injectable()
export class LinkedInScraperService {
    private driver: WebDriver;

    constructor() {
        this.driver = new Builder()
            .withCapabilities(Capabilities.chrome())
            .build()
    }

    async scrapeProfileData(url: string): Promise<any> {
        try {
            await this.driver.get(url);

            const nameElement = await this.driver.findElement(By.css('.profile-topcard-person-entity__name'));
            const name = await nameElement.getText();

            const photoElement = await this.driver.findElement(By.css('.profile-topcard-person-entity__image'));
            const photoUrl = await photoElement.getAttribute('src');

            // You can add more logic to scrape additional data (e.g., LinkedIn URL, headline, etc.)
            console.log({name, photoUrl})
            return {
                name,
                photoUrl,
                // Add more scraped data here
            };
        } catch (error) {
            throw new Error('Failed to scrape LinkedIn profile data');
        } finally {
            await this.driver.quit();
        }
    }
}
