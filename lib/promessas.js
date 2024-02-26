
import _ from 'lodash';

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
  return _.uniq(allPromessasData.map((promessa) => promessa.data.section));
}

export function getSectionPromessas(sectionName) {
  const allPromessasData = getPromessasData();
  return allPromessasData.filter((promessa) => promessa.data.section === sectionName);
}
