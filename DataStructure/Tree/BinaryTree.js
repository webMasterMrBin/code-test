class TreeNode {
  constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
  }
}

const tree = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))))

function findAllPaths(node, path) {
  if (!node) {
    return [];
  }
  const newPath = [...path, node.value];

  const paths = [newPath];

  if (node.left) {
    paths.push(...findAllPaths(node.left, newPath));
  }

  if (node.right) {
    paths.push(...findAllPaths(node.right, newPath));
  }

  return paths;
}

// 找所有路径最大值
function findMaxPathSum(root) {
  if (!root) {
    return 0;
  }
  const { value, left, right } = root;

  return value + Math.max(findMaxPathSum(left), findMaxPathSum(right))
}

// 深度优先遍历
function DFS(node) {
  if (!node) {
    return;
  }

  console.log('node', node);
  DPS(node.left);
  DPS(node.right);
}

// 广度优先
function BFS(node) {
  if (!node) {
    return;
  }

  const queue = [node];

  while (queue.length > 0) {
    const newNode = queue.shift();
    console.log('newNode', newNode);
    if (newNode.left) {
      queue.push(newNode.left);
    }
    if (newNode.right) {
      queue.push(newNode.right);
    }
    
  }
}


// 数组转二叉树 [17, 0, -4, 3, 15] =>
/* 
    17
   /  \
  0   -4
 / \
3   15 
*/
const TreeNode = function(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
};

function arrayToTree(array, i = 0) {
  if (i >= array.length) {
    return;
  }
  return new TreeNode(array[i], arrayToTree(array, 2 * i + 1), arrayToTree(array, 2 * i + 2));
};

// 找二叉树最大的深度
function traverseTree(rootNode) {
  let maxDepth = 0;

  if (!rootNode.left && !rootNode.right) {
    return 0;
  }

  if (rootNode.left) {
    maxDepth = Math.max(maxDepth, traverseTree(rootNode.left));
  }

  if (rootNode.right) {
    maxDepth = Math.max(maxDepth, traverseTree(rootNode.right));
  }

  return maxDepth + 1;
}

// 找二叉树所有路径的节点
function findAllPaths(rootNode, allPaths = []) {
  const paths = [...allPaths, rootNode];
  let lefts = [];
  let rights = [];

  if (!rootNode.left && !rootNode.right) {
    return [paths];
  }

  if (rootNode.left) {
    lefts = findAllPaths(rootNode.left, paths);
  }

  if (rootNode.right) {
    rights = findAllPaths(rootNode.right, paths);
  }

  return [...lefts, ...rights];
}

// 二叉树蛇形遍历
/* 
           A
            /\
            B  C
          /\  /\
          D E F G
          => ["A", "C", "B", "D", "E", "F", "G"]
      */
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = []; // 存储最终结果
  const queue = [root]; // 初始化队列，加入根节点
  let leftToRight = true; // 标记当前层的遍历方向

  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层的节点数
    const levelNodes = []; // 存储当前层的节点值

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // 从队列中取出节点

      // 根据当前层的遍历方向添加节点值
      if (leftToRight) {
        levelNodes.push(node.val);
      } else {
        levelNodes.unshift(node.val); // 在数组前面添加节点值
      }

      // 将当前节点的子节点添加到队列中
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(levelNodes); // 将当前层的节点值加入结果
    leftToRight = !leftToRight; // 切换层级方向
  }

  return result; // 返回最终结果
}