
import _ from 'lodash';
var slug = require("slug")

const allPromessas = require("./utils")

let PROMESSAS = null

export function getPromessasData() {
  if (PROMESSAS) {
    return PROMESSAS
  }

  PROMESSAS = allPromessas();
  return PROMESSAS
}

export function getPromessa(id) {
  const allPromessasData = getPromessasData();
  return allPromessasData.find((promessa) => promessa.id === id);
}

export function getSections() {
  const allPromessasData = getPromessasData();
  const arr = _.uniq(allPromessasData.map((promessa) => promessa.data.section))
  return Object.fromEntries(arr.map(s => [slug(s), s]))
}

export function getSectionPromessas(sectionSlug) {
  const allPromessasData = getPromessasData();
  return allPromessasData.filter((promessa) => promessa.data.sectionSlug === sectionSlug);
}

export function getPromessasBySection() {
  const allPromessasData = getPromessasData();
  return _.groupBy(allPromessasData, 'data.sectionSlug')
}

export function getSectionPromessa(slug, docId) {
  const allPromessasData = getSectionPromessas(slug);
  return allPromessasData.find((promessa) => promessa.fileId == docId);
}
