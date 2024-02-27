const algoliasearch = require('algoliasearch');

const allPromessas = require("../lib/utils")

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(process.env.PARTY);

const algoliaDocs = allPromessas().map(doc => ({
  ...doc,
  objectID: doc.uniqueIntId
}))

index.replaceAllObjects(algoliaDocs).then(({ objectIDs }) => {
  console.log("Reindex done");
});
