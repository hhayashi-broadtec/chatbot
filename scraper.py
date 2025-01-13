import requests
from bs4 import BeautifulSoup
from database import save_data
import os
from urllib.parse import urlparse, urljoin

def scrape_url(url, levels):
    scraped_data = []
    urls_to_scrape = [(url, 0)]
    scraped_urls = set()
    max_levels = min(3, int(os.getenv('SCRAPING_LEVELS', levels)))
    domain = urlparse(url).netloc

    while urls_to_scrape:
        current_url, current_level = urls_to_scrape.pop(0)
        if current_url in scraped_urls or current_level > max_levels:
            continue

        response = requests.get(current_url)
        if response.status_code != 200:
            continue

        soup = BeautifulSoup(response.content, 'html.parser')
        scraped_data.append({
            'url': current_url,
            'content': soup.get_text()
        })
        scraped_urls.add(current_url)

        if current_level < max_levels:
            for link in soup.find_all('a', href=True):
                next_url = urljoin(current_url, link['href'])
                if urlparse(next_url).netloc == domain:
                    urls_to_scrape.append((next_url, current_level + 1))

    save_data(scraped_data)
