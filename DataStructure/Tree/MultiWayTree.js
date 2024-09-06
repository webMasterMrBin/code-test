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
function findAllPaths(node, path = []) {
  const newPath = [...path, node.value];

  if (node.children.length === 0) {
    return [newPath];
  }

  return node.children.reduce((acc, cur) => {
    return [...acc, ...findAllPaths(cur, newPath)]
  }, [])
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

function findLCA(root, node1, node2) {
  if (!root) return null; // Base case: 空节点直接返回null

  // 如果当前节点匹配node1或node2，则返回当前节点
  if (root.id === node1 || root.id === node2) return root;

  // 递归在所有子树中查找node1和node2
  let foundNodes = root.children.map(child => findLCA(child, node1, node2)).filter(result => result !== null);

  // 如果在两个子树里分别找到了node1和node2，则当前节点为LCA
  if (foundNodes.length === 2) return root;

  // 如果只在一个子树中找到了node1或node2，则返回那个节点
  return foundNodes.length === 1 ? foundNodes[0] : null;
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

console.log(lca ? `LCA ID: ${lca.id}` : 'No common ancestor found');