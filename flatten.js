// 数组摊平
const target = [1, [2, [3, [4, [5]]]], [7]];

const flatten = (arr) => {
  return arr.reduce((acc, cur) => {
    if (!Array.isArray(cur)) {
      return [...acc, cur];
    }
    return [...acc, ...flatten(cur)];
  }, [])
}

console.log(flatten(target))