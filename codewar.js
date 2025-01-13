// bitcoin take over the world maybe who knows perhaps
/* 
[1,4,4,4,0,4,3,3,1] # should return [1,12,0,4,6,1]
*/

/* 

*/

/* 
  

*/

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
// console.log('tree', tree);
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

/* 
{
  'a': {
    'b': {
      'c': 12,
      'd': 'Hello World'
    },
    'e': [1,2,3]
  }
}

{
  'a/b/c': 12,
  'a/b/d': 'Hello World',
  'a/e': [1,2,3]
}
*/
function createMessage(arg) {
  return (next) => {
    if (!next) {
      return arg;
    }
    return createMessage(arg + next)
  }
}


/* 
{
  5: [],
  3: ['left'],
  1: ['left', 'left'],
  4: ['left', 'right'],
  7: ['right'],
  6: ['right', 'left'],
  9: ['right', 'right']
}
*/
// let newResult
function createBSTDirectory(root, result = {}, preRoot = {}, positions = []) {

  if (!root) {
    return result;
  }

  const newPositions = (() => {
    if (preRoot.left?.value === root.value) return [...positions, 'left'];
    if (preRoot.right?.value === root.value) return [...positions, 'right'];
    return positions;
  })();
 
  const newResult = {
    ...result,
    [root.value]: newPositions
  };

  return { ...createBSTDirectory(root.left, newResult, root, newPositions), ...createBSTDirectory(root.right, newResult, root, newPositions) }

}

const tree = {
  value: 5,
  children: [
    {
      value: 4,
      children: [
        {
          value: 18,
          children: []
        }
      ]
    },
    {
      value: 7,
      children: [
        {
          value: 3,
          children: []
        },
        {
          value: 15,
          children: [
            {
              value: 8,
              children: []
            }
          ]
        }
      ]
    }
  ]
}

// const tree = {
//   value: 1,
//   left: {
//     value: 2,
//     left: {
//       value: 3,
//       left: null,
//       right: null,
//     },
//     right: {
//       value: 4,
//       left: null,
//       right: null,
//     }
//   },
//   right: {
//     value: 6,
//     left: {
//       value: 7,
//       left: null,
//       right: null,
//     },
//     right: {
//       value: 8,
//       left: null,
//       right: null,
//     }
//   }
// }

function preOrder(node) {
  if (!node) {
    return;
  }

  console.log('node', node);
  preOrder(node.left);
  preOrder(node.right);
}

function inOrder(node) {
  if (node) {
    inOrder(node.left)
    console.log('node',node);
    inOrder(node.right)
  }
}

function postOrder(node) {
  if (node) {
    postOrder(node.left)
    postOrder(node.right)
    console.log('node',node);
  }
}


function arrayDeepness(arr, dep = 0) {
  if (!Array.isArray(arr)) {
    return [dep];
  }

  return  arr.reduce((acc, cur) => [...acc, ...arrayDeepness(cur, dep + 1)], [])
}

function findNode(root, value) {
  if (root.value === value) {
    return root;
  }

  for (const v of root.children) {
    const result = findNode(v, value);
    if (result) {
      return result;
    }
  }

}

function findMax(root,) {
  if (root.children.length === 0) {
    return root.value;
  }
  // let max = 0;
  // root.children.forEach(v => {
  //   max = Math.max(v.value, findMax(v));
  // })
  // return max;

  return Math.max(...root.children.map(v => Math.max(v.value, findMax(v))))
}

const findMaxNode = (root) => {
  // 递归获取包含最大值
  return root.children.reduce((maxNode, child) => {
    const maxChild = findMaxNode(child); // 递归寻找子树中的最大节点
    return maxChild > maxNode ? maxChild : maxNode;
  }, root.value); // 初始值设置为当前根节点
}


// console.log(findMaxNode(tree))


// interleave([1, 2, 3], [4, 5, 6], [7, 8, 9]) === [1, 4, 7, 2, 5, 8, 3, 6, 9]

function interleave(...args) {
  return Array(Math.max(...args.map(v => v.length))).fill(1).flatMap((v, i) => args.map(o => o[i] || null))
}

// 给定一个值total, 和一个数组(数组数量表示共n个值平均分该total, 除不尽平均分)
// precision 小数点精度 默认1表示 整数, 10 表示1位小数 
function average(total, array, precision = 1) {
  const baseValue = Math.floor(total * precision / array.length);
  const remander =  total * precision % array.length;

  return array.map((v, i) => remander > 0 && i < remander ? (baseValue + 1) / precision : baseValue / precision);
}