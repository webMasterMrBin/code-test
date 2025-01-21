const tree = {
  value: 'root', // 节点的值
  children: [    // 子节点数组
    {
      value: 'child1',
      children: [ // child1的子节点
        {
          value: 'grandchild1',
          children: [] // 没有子节点，空数组
        },
        {
          value: 'grandchild2',
          children: [] // 没有子节点，空数组
        }
      ]
    },
    {
      value: 'child2',
      children: [] // child2没有子节点，空数组
    }
    // ...可以有更多的子节点
  ]
};

// 递归深度优先遍历
const traverseTree = (tree) => {
  console.log('tree.value', tree.value);
  if (Array.isArray(tree.children) && tree.children.length === 0) {
    return;
  }
 
  tree.children.forEach(v => {
    traverseTree(v);
  })
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

function findMaxValue(root) {
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

/* const findMaxValue = (root) => {
  // 递归获取包含最大值
  return root.children.reduce((maxNode, child) => {
    const maxChild = findMaxNode(child); // 递归寻找子树中的最大节点
    return maxChild > maxNode ? maxChild : maxNode;
  }, root.value); // 初始值设置为当前根节点
} */

// 找到所有分支的树的集合
// 场景2  所用分支树集合深度判断 可计算是否是完美二叉树
function findAllPaths(node, path = []) {
  const newPath = [...path, node.value];

  if (node.children.length === 0) {
    return [newPath];
  }

  return node.children.reduce((acc, cur) => {
    return [...acc, ...findAllPaths(cur, newPath)]
  }, [])
}

// 找所有叶子节点 结果是一个数组
function filterLeafNodes(node, allLeafNodes = []) {
  if (node.children.length === 0) {
    return [...allLeafNodes, node];
  }

  return node.children.reduce((acc, cur) => [...acc, ...filterLeafNodes(cur, allLeafNodes)], []);
}

// 队列广度优先遍历
const BreadthFirstTraverseTree = tree => {
  const queue = [tree]; // 初始化队列，起始为树的根节点

  while (queue.length > 0) {
    const node = queue.shift(); // 从队列中移除当前节点

    // 处理当前节点
    console.log(node.value);

    // 将所有子节点添加到队列的末尾
    if (node.children) {
      node.children.forEach(child => {
        queue.push(child);
      });
    }
  }
}

// 深度遍历函数（迭代）
function depthFirstTraversal(tree) {
  const stack = [tree]; // 初始化栈，存入根节点
  const result = []; // 存储遍历结果

  while (stack.length > 0) {
      const node = stack.pop(); // 弹出栈顶节点
      result.push(node.value); // 处理节点（这里做的是记录值）

      // 倒序添加子节点到栈，这样弹出的顺序是从左到右
      for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
      }
  }

  return result;
}

let max = -Infinity
// n叉树所有路径值的和的最大值
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




// 测试用例
const tree = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 4,
          children: []
        }
      ]
    },
    {
      id: 3,
      children: []
    }
  ]
};

const lca = findLCA(tree, 2, 4);

// 查找多叉树最大深度
function findTreeMaxDepth(root){
  let maxDepth = 0;

  if (root.children.length === 0) {
    return 0;
  }

  root.children.forEach(v => {
    maxDepth = Math.max(maxDepth, createTreeDirectory(v));
  });

  return maxDepth + 1;
}

// 从一个多叉树中筛选出所有叶子节点满足 搜索title的值组成一个新的过滤的tree
/**
 * {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {
              title: '0-0-0-1',
              key: '0-0-0-1',
              children: [],
            },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
              children: [],
            },
            {
              title: '0-0-1-22',
              key: '0-0-1-22',
              children: [],
            },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          children: [],
        },
      ],
    },
    若keyword为2 则搜索后预期变为
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {
              title: '0-0-1-2',
              key: '0-0-1-2',
              children: [],
            },
            {
              title: '0-0-1-22',
              key: '0-0-1-22',
              children: [],
            },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          children: [],
        },
      ],
    },
 */
function filterTree(node, keyword) {
  // 如果是叶子节点，并且title包含'2'，保留这个节点
  if (node.children.length === 0) {
    return node.title.includes(keyword) ? node : null;
  }
  // 当前node 的所有子节点集合
  const filterChildren = node.children.map(child => filterTree(child, keyword)).filter(Boolean);

  return filterChildren.length > 0 ? {
    ...node,
    children: filterChildren,
  } : null;
}

function findSubNodes(node, key) {
  const result = [];

  function collectNodes(node) {
    result.push(node.key);
    if (node.children.length === 0) {
     return;
    }

    node.children.forEach(v => {
      collectNodes(v);
    });
  }

  function traverseTree(node) {
    if (node.key === key) {
      collectNodes(node)
    } else {
      node.children.forEach(v => traverseTree(v));
    }
  }

  traverseTree(node);

  return result;
}
