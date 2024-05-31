// bitcoin take over the world maybe who knows perhaps
/* 
[1,4,4,4,0,4,3,3,1] # should return [1,12,0,4,6,1]
*/

/* 

*/

/* 
  

*/
const tree  = {
  value: 17,
  children: [
    {
      value: 3,
      children: [
        {
          value: 2,
          children: []
        }
      ]
    },
    {
      value: -10,
      children: [
        {
          value: 16,
          children: []
        },
        {
          value: 1,
          children: [
            {
              value: 13,
              children: []
            }
          ]
        }
      ]
    }
  ]
}
// function findAllPaths(node, path) {
//   const newPath = [...path, node.value];

//   if (node.children.length === 0) {
//     return [newPath];
//   }

//   return node.children.reduce((acc, cur) => {
//     return [...acc, ...findAllPaths(cur, newPath)]
//   }, [])
// }

// // 执行深度遍历并找到所有路径
// const allPaths = findAllPaths(tree, []);
// console.log(allPaths);

// class TreeNode {
//   constructor(value, left = null, right = null) {
//       this.value = value;
//       this.left = left;
//       this.right = right;
//   }
// }

// const tree = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))))
console.log('tree', tree);
let max = -Infinity;
function findMax(node, currentSum) {
  currentSum += node.value;
  if (node.children.length === 0) {
    max = Math.max(max, currentSum);
    return;
  }
  node.children.forEach(v => {
    findMax(v, currentSum);
  })
  return max;
}

// { a: 1, b: 2, c: { d: { e: 3 } } } => { a: 1, b: 2, c: { d: { e: 3, depth: 2 }, depth: 1 }, depth: 0 }

function recordDepth(tree, num = 0) {
  if (!Object.prototype.toString.call(tree).includes('Object')) {
    return null;
  }

  const newTree = {...tree, depth: num };

  for (const key in tree) {
    newTree[key] = recordDepth(tree[key], num + 1) || tree[key];
  }
  console.log(' newTree ', newTree)
  // return newTree;
}
const a = { a: 1, b: 2, c: { d: { e: 3 } } }
console.log(recordDepth(a))
console.log('a', a)