const { nanohash } = require('./../dist')
const nhash = nanohash({ size: 9 })

const ID = nhash.generate()
console.log('ID', ID)

const code = nhash.dehash(ID)
console.log('code', code)
