const { nanohash } = require('./../dist')

const nhash = nanohash()

// Take whatever ID you get from a generated
const userId = '258296287713034771'

// Convert the ID to a string code version
const userCode = nhash.faunaCode('258296287713034771')
// output: эh3ъmöýRt

// Reversethe code to the original ID
const readUserIdFromCode = nhash.faunaId(userCode)
// output: 258296287713034771
