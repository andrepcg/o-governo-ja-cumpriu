const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PARTY = process.env.NEXT_PUBLIC_PARTY || process.env.PARTY

const sectionsDir = path.join(process.cwd(), 'promessas_data', PARTY);

module.exports = function allPromessas() {
  const sectionNames = fs.readdirSync(sectionsDir);

  return sectionNames.flatMap((sectionName) => {
    const sectionPath = path.join(sectionsDir, sectionName);
    const fileNames = fs.readdirSync(sectionPath);
    const sectionNumber = Number(sectionName.split('-')[0]);

    return fileNames.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(sectionPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

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
        content: matterResult.content,
      };
    });
  }).sort((a, b) => a.fullId > b.fullId ? 1 : -1)
}
