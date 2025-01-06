import React from 'react';

const ScrapedData = ({ data }) => {
  return (
    <div>
      <h2>Scraped Data</h2>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>URL:</strong> {item.url}
              <br />
              <strong>Content:</strong> {item.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScrapedData;
