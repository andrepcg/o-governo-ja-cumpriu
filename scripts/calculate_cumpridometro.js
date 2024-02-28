const allPromessas = require("../lib/utils").allPromessas();

const total = allPromessas.length
const fulfilled = allPromessas.filter(p => p.fulfilled_date).length
const data = {
  total: allPromessas.length,
  fulfilled: fulfilled,
  text: `${fulfilled}/${total}`
}

console.log(JSON.stringify(data, null, 2))