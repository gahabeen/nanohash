const { nanohash } = require('./../dist')

/**
 * Defines the length of the string code to 6 characters
 * Default alphabet used is[a-zA-Z0-9]
 */
const nhash = nanohash({ size: 6 })

const ids = nhash.bulk(10)
console.log('ids', ids)

/**
 * If you wanna make sure everything goes smoothly on the document creation you can use
 * the provided UDF nanohash.validReference
 */

// q.Create(q.Call("nanohash.validReference", [<collection>, [...<ids>]]))
// Ex: q.Create(q.Call("nanohash.validReference", ["users", [ids]]))

/**
 * You can use the ID when creating a new document in Fauna.
 * Ex: q.Create(q.Ref(q.Collection("users", ID)), { data: { name: "Joe" } })
 */

console.log('codes', ids.map(nhash.dehash))
