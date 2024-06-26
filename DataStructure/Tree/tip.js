// 树结构和 嵌套数组求 最大深度
// 查找多叉树最大深度
function findTreeMaxDepth(root){
  let maxDepth = 0;

  if (root.children.length === 0) {
    return 0;
  }

  // root.children.forEach(v => {
  //   maxDepth = Math.max(maxDepth, createTreeDirectory(v));
  // });

  // return maxDepth + 1;

  return 1 + Math.max(0, ...root.children.map(findTreeMaxDepth));
}

// 嵌套数组最大深度
function arrayDeepness(arr) {
  if (!Array.isArray(arr)) {
    return 0;
  }
  return 1 + Math.max(0, ...arr.map(arrayDeepness))
}

// 嵌套数组深度集合 拿到深度集合可以获取最大or最小值
function arrayDeepness(arr, dep = 0) {
  if (!Array.isArray(arr)) {
    return dep;
  }

  return arr.flatMap(v => arrayDeepness(v, dep + 1))
}

/* better
function arrayDeepness(arr, dep = 0) {
  if (!Array.isArray(arr)) {
    return [dep];
  }

  return  arr.reduce((acc, cur) => [...acc, ...arrayDeepness(cur, dep + 1)], [])
} */

const findMaxNode = (root) => {
  // 递归获取包含最大值
  return root.children.reduce((maxNode, child) => {
    const maxChild = findMaxNode(child); // 递归寻找子树中的最大节点
    return maxChild > maxNode ? maxChild : maxNode;
  }, root.value); // 初始值设置为当前根节点
}

console.log(arrayDeepness([5, [1, 2, [3, 4]]]))