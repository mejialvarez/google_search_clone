const axios = require('axios');
const cheerio = require('cheerio');

class WebScraper {
  async getContent(url) {
    try {
      const page = await axios(url)
      const html = page.data;
      const $ = cheerio.load(html);
      const pageContent = $('html')
        .contents()
        .text()
        .replace(/(\n|\r)/g,'')
        .replace(/\s\s+/g, ' ')
        .trim()
      return pageContent
    } catch(e) {
      console.log('[WebScraper] Error: ', e.message)
      throw e
    }
  }
}

module.exports = new WebScraper()