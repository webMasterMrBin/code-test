function quickSort(arr) {
  // 如果数组只有一个数，就直接返回它
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2); // 选择中间项作为基准
  const pivot = arr[pivotIndex]; // 获取基准值
  const less = []; // 存储比基准小的
  const greater = []; // 存储比基准大的

  // 分区操作
  for (let i = 0; i < arr.length; i++) {
    // 取出基准后，跳过基准的索引
    if (i === pivotIndex) continue;

    // 比基准小的放在 less 数组，比基准大的放在 greater 数组
    if (arr[i] < pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }

  // 递归调用
  return [...quickSort(less), pivot, ...quickSort(greater)];
}

console.log(quickSort([9,99,4,1]))