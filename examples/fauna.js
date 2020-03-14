const { nanohash } = require('./../dist')

/**
 * Defines the length of the string code to 6 characters
 * Default alphabet is used [a-zA-Z0-9]
 */
const nhash = nanohash({ size: 6 })

const ID = nhash.generate()
console.log('ID', ID)

/**
 * You can use the ID when creating a new document in Fauna.
 * Ex: q.Create(q.Ref(q.Collection("users", ID)), { data: { name: "Joe" } })
 */

const code = nhash.dehash(ID)
console.log('code', code)
