const target = { a: { b: 1 }, c: 1, d: null, e: [{ c: [] }], date: new Date() }

const getOtherObject = (value) => {
  return Object.prototype.toString.call(value)
}

const deepClone = (value) => {
  // date reg map more...
  const otherObject = getOtherObject(value);
  if (typeof value !== 'object' || value === null || otherObject.includes('Date')) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(value => deepClone(value));
  }

  if (typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, deepClone(v)]))
  }
}

const result = deepClone(target);
target.d = 1;
console.log('target', target);
console.log('result', result);