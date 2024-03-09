const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
var slug = require("slug")

const PARTY = process.env.NEXT_PUBLIC_PARTY || process.env.PARTY

const sectionsDir = path.join(process.cwd(), 'promessas_data', PARTY);

function allPromessas() {
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
      const sectionSlug = slug(matterResult.data.section)

      // Combine the data with the id
      return {
        globalId: sectionNumber * 1000 + Number(id),
        docPath: fullPath.replace(process.cwd(), ""),
        fileId: id,
        data: {
          ...matterResult.data,
          title: [matterResult.data.section, matterResult.data.sub_section, id].filter(Boolean).join(" / "),
          number: Number(id),
          sectionNumber: sectionNumber,
          sectionSlug: sectionSlug,
        },
        content: matterResult.content.trim(),
        urlPath: `/s/${sectionSlug}/${id}`
      };
    });
  }).sort((a, b) => a.globalId > b.globalId ? 1 : -1)
}

function injectLfTracker(lf_id) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(ss,ex){window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('${lf_id}');
        `
      }}>
    </script>
  )
}

module.exports = {
  allPromessas: allPromessas,
  injectLfTracker: injectLfTracker
}
