const allPromessas = require("../lib/utils").allPromessas();

allPromessas.forEach(promessa => {
  if (promessa.data.section?.length === 0) {
    console.error(`Promessa ${promessa.docPath} is missing section`)
    process.exit(1)
  }

  if (promessa.content.length === 0) {
    console.error(`Promessa ${promessa.docPath} is missing content`)
    process.exit(1)
  }

  const links_to_news_articles = promessa.data.links_to_news_articles
  if (links_to_news_articles && !Array.isArray(links_to_news_articles)) {
    console.error(`Promessa ${promessa.docPath} links_to_news_articles is not an array`)
    process.exit(1)
  }

  const fulfilled_date = promessa.data.fulfilled_date
  if (fulfilled_date && isNaN(new Date(fulfilled_date))) {
    console.error(`Promessa ${promessa.docPath} fulfilled_date is not valid`)
    process.exit(1)
  }
});
