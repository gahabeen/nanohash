import nanoid from 'nanoid/generate'
import * as fauna from './fauna'

declare module nanohash {
  interface options {
    alphabet?: string
    hashtable?: hashtable
    size?: number
    maxSize?: number
    prefix?: string
  }

  interface hashtable {
    [key: string]: string
  }

  type ID = string
  type code = string
}

export function nanohash(options?: nanohash.options) {
  let { size = 6, maxSize = 9, hashtable = {}, alphabet, prefix = '1' } = options || {}
  if (maxSize > 9) maxSize = 9
  if (size > maxSize) throw new Error(`Size cannot be higher than ${maxSize}`)

  hashtable = Object.assign(
    {
      '0': '00',
      '1': '01',
      '2': '02',
      '3': '03',
      '4': '04',
      '5': '05',
      '6': '06',
      '7': '07',
      '8': '08',
      '9': '09',
      a: '10',
      b: '11',
      c: '12',
      d: '13',
      e: '14',
      f: '15',
      g: '16',
      h: '17',
      i: '18',
      j: '19',
      k: '20',
      l: '21',
      m: '22',
      n: '23',
      o: '24',
      p: '25',
      q: '26',
      r: '27',
      s: '28',
      t: '29',
      u: '30',
      v: '31',
      w: '32',
      x: '33',
      y: '34',
      z: '35',
      A: '36',
      B: '37',
      C: '38',
      D: '39',
      E: '40',
      F: '41',
      G: '42',
      H: '43',
      I: '44',
      J: '45',
      K: '46',
      L: '47',
      M: '48',
      N: '49',
      O: '50',
      P: '51',
      Q: '52',
      R: '53',
      S: '54',
      T: '55',
      U: '56',
      V: '57',
      W: '58',
      X: '59',
      Y: '60',
      Z: '61'
    },
    hashtable || {}
  )

  alphabet = alphabet || Object.keys(hashtable).join('')

  const codetable = Object.entries(hashtable).reduce((table, [key, code]) => {
    table[code] = key
    return table
  }, {})

  function generate(): nanohash.ID {
    return hash(nanoid(alphabet, size))
  }

  function bulk(nb: number = 10): nanohash.ID[] {
    return Array(nb)
      .fill(undefined)
      .map(generate)
  }

  function hash(code: nanohash.code): nanohash.ID {
    if (code.length > maxSize) throw new Error(`Code cannot be longer than ${maxSize}`)
    let firstNumberAlphabet = '12345678'
    return (
      (firstNumberAlphabet.includes(prefix) ? prefix : '1') +
      code
        .split('')
        .map((c) => {
          try {
            return hashtable[c]
          } catch (error) {
            throw new Error(`The character: ${c} can't be used`)
          }
        })
        .join('')
    )
  }

  function dehash(id: nanohash.ID): nanohash.code {
    try {
      Number(id)
    } catch (error) {
      throw new Error(`ID ${id} can't be cast to Number. The ID must be wrong.`)
    }
    return id
      .slice(1)
      .match(/.{1,2}/g)
      .map((c) => {
        try {
          return codetable[c]
        } catch (error) {
          throw new Error(`The code: ${c} doesn't exist`)
        }
      })
      .join('')
  }

  return {
    generate,
    bulk,
    hash,
    dehash
  }
}

export { fauna }
