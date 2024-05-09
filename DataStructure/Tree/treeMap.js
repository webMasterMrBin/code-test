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

traverseTree(tree);