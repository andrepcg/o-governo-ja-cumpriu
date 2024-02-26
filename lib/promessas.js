import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import _ from 'lodash';

import { PARTY } from '../consts'

const sectionsDir = path.join(process.cwd(), 'promessas_data', PARTY);

let PROMESSAS = null

export async function getPromessasData() {
  if (PROMESSAS) {
    return PROMESSAS
  }

  const sectionNames = fs.readdirSync(sectionsDir);

  PROMESSAS = await Promise.all(sectionNames.map(async (sectionName) => {
    const sectionPath = path.join(sectionsDir, sectionName);
    const fileNames = fs.readdirSync(sectionPath);
    const sectionNumber = Number(sectionName.split('-')[0]);

    return await Promise.all(fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(sectionPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Use remark to convert markdown into HTML string
        const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id
      return {
        fullId: sectionNumber * 1000 + Number(id),
        id: `${sectionName}-${id}`,
        docPath: fullPath.replace(process.cwd(), ""),
        data: {
          ...matterResult.data,
          title: `${matterResult.data.section} / ${matterResult.data.sub_section} / ${id}`,
          number: Number(id),
          sectionNumber: sectionNumber,
        },
        html: contentHtml,
      };
    }));
  }))
  PROMESSAS = PROMESSAS.flat().sort((a, b) => a.fullId > b.fullId ? 1 : -1);
  return PROMESSAS;
}

export async function getPromessa(id) {
  const allPromessasData = await getPromessasData();
  return allPromessasData.find((promessa) => promessa.id === id);
}

export async function getSections() {
  const allPromessasData = await getPromessasData();
  return _.uniq(allPromessasData.map((promessa) => promessa.data.section));
}

export async function getSectionPromessas(sectionName) {
  const allPromessasData = await getPromessasData();
  return allPromessasData.filter((promessa) => promessa.data.section === sectionName);
}
