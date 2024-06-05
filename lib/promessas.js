var slug = require("slug")
var groupBy = require('lodash/groupBy');
var uniq = require('lodash/uniq');
var memoize = require('lodash/memoize');

const { allPromessas } = require("./utils")

export const getPromessasData = memoize(allPromessas)

export const getSections = memoize(() => {
  const arr = uniq(getPromessasData().map((promessa) => promessa.data.section))
  return Object.fromEntries(arr.map(s => [slug(s), s]))
})

export function getSectionPromessas(sectionSlug) {
  return getPromessasData().filter((promessa) => promessa.data.sectionSlug === sectionSlug);
}

export const getPromessasBySection = memoize(() => groupBy(getPromessasData(), 'data.sectionSlug'));

export function getSectionPromessa(slug, fileId) {
  const allPromessasData = getSectionPromessas(slug);
  return allPromessasData.find((promessa) => promessa.fileId == fileId);
}

export function getSectionPromessaPreviousNext(slug, fileId) {
  const allPromessasData = getSectionPromessas(slug);
  const prevId = Number(fileId) - 1;
  const nextId = Number(fileId) + 1;

  return {
    previous: prevId <= 0 ? null : getSectionPromessa(slug, prevId),
    next: getSectionPromessa(slug, nextId)
  }
}
