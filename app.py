from flask import Flask, request, jsonify
from scraper import scrape_url
from database import save_data, get_data
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

@app.route('/input_url', methods=['POST'])
def input_url():
    data = request.get_json()
    url = data.get('url')
    levels = data.get('levels')
    if not url or not levels:
        return jsonify({'error': 'URL and levels are required'}), 400
    scrape_url(url, levels)
    return jsonify({'message': 'Scraping started'}), 200

@app.route('/scraped_data', methods=['GET'])
def scraped_data():
    data = get_data()
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
