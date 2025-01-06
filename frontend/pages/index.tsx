import React, { useState } from 'react';
import axios from 'axios';
import ScraperForm from '../components/ScraperForm';
import ScrapedData from '../components/ScrapedData';

const IndexPage = () => {
  const [scrapedData, setScrapedData] = useState([]);

  const handleScrape = async (url, levels) => {
    try {
      const response = await axios.post('/input_url', { url, levels });
      if (response.status === 200) {
        const dataResponse = await axios.get('/scraped_data');
        setScrapedData(dataResponse.data);
      }
    } catch (error) {
      console.error('Error scraping data:', error);
    }
  };

  return (
    <div>
      <h1>Chatbot Scraper</h1>
      <ScraperForm onScrape={handleScrape} />
      <ScrapedData data={scrapedData} />
    </div>
  );
};

export default IndexPage;
