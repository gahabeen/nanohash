const { nanohash } = require('./../dist')
const nhash = nanohash({ size: 5 })

const ID = nhash.generate()
console.log('ID', ID)

const code = nhash.dehash(ID)
console.log('code', code)

console.log(nhash.bulk());
console.log(nhash.hash("France"));
