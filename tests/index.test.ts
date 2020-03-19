import { nanohash } from './../src'

describe('nanohash.generate(size:6)', () => {
  const nhash = nanohash({ size: 6 })
  test('should return a 1(random)+12-digits ID', async () => {
    expect(nhash.generate().length).toBe(13)
  })
})

describe('nanohash.bulk(nb:10)', () => {
  const nhash = nanohash({ size: 6 })
  test('should return 10 codes', async () => {
    expect(nhash.bulk().length).toBe(10)
  })
})

describe('nanohash.hash()', () => {
  const nhash = nanohash({ size: 6 })
  test('should return a valid string-number ID', async () => {
    expect(Number(nhash.hash('Ra7JcL').slice(1))).toBe(531007451247)
  })
})

describe('nanohash.dehash()', () => {
  test('should return the same code - 1 char', async () => {
    const nhash = nanohash({ size: 1 })
    expect(nhash.dehash(nhash.hash('g'))).toBe('g')
  })
  test('should return the same code - 2 chars', async () => {
    const nhash = nanohash({ size: 2 })
    expect(nhash.dehash(nhash.hash('M7'))).toBe('M7')
  })
  test('should return the same code - 3 chars', async () => {
    const nhash = nanohash({ size: 3 })
    expect(nhash.dehash(nhash.hash('Qkt'))).toBe('Qkt')
  })
  test('should return the same code - 4 chars', async () => {
    const nhash = nanohash({ size: 4 })
    expect(nhash.dehash(nhash.hash('WE0e'))).toBe('WE0e')
  })
  test('should return the same code - 5 chars', async () => {
    const nhash = nanohash({ size: 5 })
    expect(nhash.dehash(nhash.hash('uzIi6'))).toBe('uzIi6')
  })
  test('should return the same code - 6 chars', async () => {
    const nhash = nanohash({ size: 6 })
    expect(nhash.dehash(nhash.hash('yNETbB'))).toBe('yNETbB')
  })
  test('should return the same code - 7 chars', async () => {
    const nhash = nanohash({ size: 7 })
    expect(nhash.dehash(nhash.hash('g56P74z'))).toBe('g56P74z')
  })
  test('should return the same code - 8 chars', async () => {
    const nhash = nanohash({ size: 8 })
    expect(nhash.dehash(nhash.hash('g5pa74z'))).toBe('g5pa74z')
  })
  test('should return the same code - 9 chars ', async () => {
    const nhash = nanohash({ size: 9 })
    expect(nhash.dehash(nhash.hash('HXVU8nyTr'))).toBe('HXVU8nyTr')
  })
})

describe('nanohash.faunaCode()', () => {
  const nhash = nanohash()
  test('should, for an even number string, return a reversible code to nanohash.faunaId()', async () => {
    const id = '258296287713034771'
    expect(nhash.faunaId(nhash.faunaCode(id))).toBe(id)
  })
  test('should, for an odd number string, return a reversible code to nanohash.faunaId()', async () => {
    const id = '1258296287713034771'
    expect(nhash.faunaId(nhash.faunaCode(id))).toBe(id)
  })
})
