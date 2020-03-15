interface FaunaScaffoldOptions {
  codetable?: any
}

export async function scaffold(q: any, { codetable }: FaunaScaffoldOptions = {}) {
  codetable = codetable || {
    h00: '0',
    h01: '1',
    h02: '2',
    h03: '3',
    h04: '4',
    h05: '5',
    h06: '6',
    h07: '7',
    h08: '8',
    h09: '9',
    h10: 'a',
    h11: 'b',
    h12: 'c',
    h13: 'd',
    h14: 'e',
    h15: 'f',
    h16: 'g',
    h17: 'h',
    h18: 'i',
    h19: 'j',
    h20: 'k',
    h21: 'l',
    h22: 'm',
    h23: 'n',
    h24: 'o',
    h25: 'p',
    h26: 'q',
    h27: 'r',
    h28: 's',
    h29: 't',
    h30: 'u',
    h31: 'v',
    h32: 'w',
    h33: 'x',
    h34: 'y',
    h35: 'z',
    h36: 'A',
    h37: 'B',
    h38: 'C',
    h39: 'D',
    h40: 'E',
    h41: 'F',
    h42: 'G',
    h43: 'H',
    h44: 'I',
    h45: 'J',
    h46: 'K',
    h47: 'L',
    h48: 'M',
    h49: 'N',
    h50: 'O',
    h51: 'P',
    h52: 'Q',
    h53: 'R',
    h54: 'S',
    h55: 'T',
    h56: 'U',
    h57: 'V',
    h58: 'W',
    h59: 'X',
    h60: 'Y',
    h61: 'Z'
  }

  return {
    splitEvery: q.CreateFunction({
      name: 'nanohash.splitEvery',
      body: q.Query(q.Lambda(['str', 'length'], q.Map(q.FindStrRegex(q.Var('str'), q.Concat(['.{1,', q.Var('length'), '}'])), q.Lambda('match', q.Select('data', q.Var('match'))))))
    }),
    dropFirstCharacter: q.CreateFunction({
      name: 'nanohash.dropFirstCharacter',
      body: q.Query(q.Lambda(['str'], q.Concat(q.Take(q.Subtract(q.Add(1, q.Count(q.Call('nanohash.stringArray', q.Var('str')))), 1), q.Drop(1, q.Call('nanohash.stringArray', q.Var('str')))))))
    }),
    stringArray: q.CreateFunction({
      name: 'nanohash.stringArray',
      body: q.Query(q.Lambda(['nb'], q.Call('nanohash.splitEvery', q.ToString(q.Var('nb')), '1')))
    }),
    validReference: q.CreateFunction({
      name: 'nanohash.validReference',
      body: q.Query(
        q.Lambda(
          ['collection', 'ids'],
          q.Let(
            {
              availableId: q.Select(0, q.Filter(q.Var('ids'), q.Lambda('id', q.Not(q.Exists(q.Ref(q.Collection(q.Var('collection')), q.Var('id')))))), null)
            },
            q.If(q.IsNull(q.Var('availableId')), null, q.Ref(q.Collection(q.Var('collection')), q.Var('availableId')))
          )
        )
      )
    }),
    dehash: q.CreateFunction({
      name: 'nanohash.dehash',
      body: q.Query(
        q.Lambda(
          ['id'],
          q.Let(
            {
              codetable,
              clean_id: q.Call('nanohash.dropFirstCharacter', [q.Var('id')]),
              split_id: q.Map(q.FindStrRegex(q.Var('clean_id'), '.{1,2}'), q.Lambda('match', q.Select('data', q.Var('match'))))
            },
            q.Concat(
              q.Map(
                q.Var('split_id'),
                q.Lambda(
                  'char',
                  q.Let(
                    {
                      resolvedCode: q.Select(q.Concat(['h', q.Var('char')]), q.Var('codetable'), null)
                    },
                    q.If(q.IsNull(q.Var('resolvedCode')), q.Abort('Wrong code'), q.Var('resolvedCode'))
                  )
                )
              )
            )
          )
        )
      )
    })
  }
}
