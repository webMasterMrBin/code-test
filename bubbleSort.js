function bubbleSort(arr) {
  let len = arr.length;
  // 外层循环，负责控制排序的总轮数，每一轮会把一个最大元素放到正确的位置
  for (let i = 0; i < len; i++) {
    // 内层循环，负责在每一轮排序中进行元素的比较和交换
    for (let j = 0; j < len - 1 - i; j++) {
      // 如果当前元素大于下一个元素，交换它们的位置
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}