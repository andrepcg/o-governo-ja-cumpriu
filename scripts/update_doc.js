const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

const currentDir = process.cwd();
const docPath = path.join(currentDir, process.argv[2]);
const fulfilled_date = new Date(process.argv[3]);
const links = process.argv[4] || [];

if (isNaN(fulfilled_date)) {
  console.error("❌ Data invalida");
  process.exit(1);
}

if (links.length === 0) {
  console.error("❌ Links necessarios");
  process.exit(1);
}

const docText = fs.readFileSync(docPath, 'utf8')
const matterContents = matter(docText)

if (matterContents.data.fulfilled_date) {
  console.error("❌ A promessa ja foi cumprida")
  process.exit(1)
}

const outputData = {
  ...matterContents.data,
  fulfilled_date: fulfilled_date.toISOString().split('T')[0],
  links_to_news_articles: links.split(",")
}

const newDocText = matter.stringify(matterContents.content, outputData)
fs.writeFileSync(docPath, newDocText, { encoding: "utf8" })