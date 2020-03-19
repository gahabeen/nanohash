## nanohash

A tiny unique string ID generator including a matching 64-bit numeric value

### Documentation
[Check the doc: NanoHash](https://gahabeen.github.io/nanohash/classes/_index_.nanohash.html)

### Why?

I created this lib to generate short codes _youtube-alike_ (ex: PkZNo7MFNFg). Except that in my case I made it possible from 1 to 9 characters maximum. The size of max 9 characters being due to the 64-bit numeric limitation of [**Fauna Document Id**](fauna.com) which is a **Long** number (A 64-bit signed decimal integer number.).

You can create a document with a given ID and reverse it back and forth from an ID to a short-code.

```js
const { nanohash } = require('nanohash')

// The default alphabet used to generate short-codes is a-zA-Z0-0
// If you wanna pick wisely the size of your codes regarding to the alphabet used I strongly recommand you to go and check https://zelark.github.io/nano-id-cc/.
// Also even if you were to create and already existing code you could simply create another one as a fallback (or already provide a list of several codes to pick from).

const nhash = nanohash({ size: 6 })

const id = nhash.generate()
// output: 1342859071901

const shortCode = nhash.dehash(id)
// output: ysX7j1

const backToId = nhash.hash(shortCode)
// output: 1342859071901
// same as id
```

It's then easy to create documents using the generated ids (knowing they have already corresponding reversible short-codes).

```js
const fauna = require('faunadb')
const q = fauna.query
const client = new fauna.Client({ secret: 'your-secret' })

// create a user document
client.query(q.Create(q.Ref(q.Collection('users'), nhash.generate()), { data: { name: 'Joe' } }))

// create a note document
client.query(q.Create(q.Ref(q.Collection('notes'), nhash.generate()), { data: { owner: q.Ref(q.Collection('users'), '1342859071901') } }))

//...

// in your page url you can include the converted code
// for your user ID
const userCode = nhash.dehash('1342859071901')
// output: ysX7j1

// and your note ID
const noteCode = nhash.dehash('1304807441806')
// output: uM7Ii6

/*
  We could easily imagine then to have your routes in your front set as follows:
  myapp.com/users/<userCode>/notes/<noteCode> 
  ex: myapp.com/users/ysX7j1/notes/uM7Ii6 
*/
```

You can also play with bulk generation to create several documents or do retries if a creation fails for an existing ID.

```js
const codes = nhash.bulk()
/* output: [
  '1342859071901',
  '1304807441806',
  '1160506510704',
  '1295220296107',
  '1312555266027',
  '1344940551137',
  '1090639062514',
  '1435957560823',
  '1135840001452',
  '1180647530040'
]
*/
```

### Dehash an ID straight in a Fauna User-Defined Function

You can scaffold the creation of the functions required to dehash an ID wherever you want in your Fauna FQL queries by doing as follow.

```js
const fauna = require('faunadb')
const q = fauna.query
const client = new fauna.Client({ secret: 'your-secret' })

const NanoHash = require('nanohash')

client.query(NanoHash.fauna.scaffold(q))
// Check fauna.scaffold() function to learn more about what's being created.
```

You can then use `Call("nanohash.dehash",["1342859071901"])` to retrieve `ysX7j1`.

### This is a draft.

I've been wanting to use a short string as unique ID for Fauna but couldn't because of the numeric only restriction. I'm not sure when (or if) it's gonne change on Fauna's end and I find it silly to have a generated ID by Fauna AND and another unique code in addition.

At least this lib will fill this gap for my use cases and maybe yours. 
