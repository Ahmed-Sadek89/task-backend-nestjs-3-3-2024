import { LinkedInScraperService } from './linkedin-scraper.service';

describe('LinkedInScraperService', () => {
  let service: LinkedInScraperService;

  beforeEach(() => {
    service = new LinkedInScraperService();
  });

  

  it('should scrape profile data', async () => {
    const profileData = await service.scrapeProfileData('https://www.linkedin.com/in/example');
    expect(profileData.name).toBeDefined();
    expect(profileData.photoUrl).toBeDefined();
    // Add more assertions as needed
  });
});