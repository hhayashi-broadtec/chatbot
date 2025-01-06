import React, { useState } from 'react';

const ScraperForm = ({ onScrape }) => {
  const [url, setUrl] = useState('');
  const [levels, setLevels] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onScrape(url, levels);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="levels">Levels:</label>
        <input
          type="number"
          id="levels"
          value={levels}
          onChange={(e) => setLevels(e.target.value)}
          min="1"
          required
        />
      </div>
      <button type="submit">Start Scraping</button>
    </form>
  );
};

export default ScraperForm;
