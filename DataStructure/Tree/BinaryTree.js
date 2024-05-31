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

  if (!right) {
    return value + findMaxPathSum(left)
  }
  
  if (!left) {
    return value + findMaxPathSum(right)
  }

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
