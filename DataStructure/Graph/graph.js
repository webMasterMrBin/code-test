// 定义图的邻接列表
const adjacencyList = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

function findShortestPath(graph, start, end) {
  let visited = new Set(); // 已访问的节点
  let queue = [[start]]; // 将起始点作为路径的第一步

  while (queue.length > 0) {
    let path = queue.shift(); // 获取并移除队列的第一个路径
    let node = path[path.length - 1]; // 当前路径的最后一个节点
    
    if (node === end) {
      // 找到终点，返回路径
      return path;
    }
    
    if (!visited.has(node)) {
      visited.add(node); // 标记节点为已访问
      
      let neighbors = graph[node];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          // 复制路径并添加新的邻居
          let newPath = path.concat([neighbor]);
          queue.push(newPath); // 新路径加入队列
        }
      }
    }
  }

  return null; // 未找到路径
}

// 示例：从D到F的最短路径
const shortestPath = findShortestPath(adjacencyList, 'D', 'F');
console.log(shortestPath); // 输出应为 ['D', 'B', 'E', 'F']

// A
// / \
// B---C
// / \   \
// D---E---F
