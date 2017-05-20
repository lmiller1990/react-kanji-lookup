let pairs = { 
  '１': '1',
  '２': '2',
  '３': '3',
  '４': '4',
  '５': '5',
  '６': '6',
  '７': '7',
  '８': '8',
  '９': '9',
  '０': '0',
  '＜': '<',
  '｜': '|',
  '、': ','
}

const sub = (char) => {
  for (let p in pairs) {
    if (p === char) {
      return pairs[p]
    }
  }
  return null
}

const latin = (query) => {
  let _query = ''
  for (let q in query) {
    let rep = sub(query[q])
    _query += rep ? rep : query[q]
  }
  return _query
}

export { latin }

