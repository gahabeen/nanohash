const { nanohash, presets } = require('./../dist')

// Let's you create a short readable folder reference (0/O and 1/I are banned)
const nhash = nanohash(presets.HUMAN_READABLE_REF)

const ID = nhash.generate()
console.log('ID', ID)

const code = nhash.dehash(ID)
console.log('code', code)
