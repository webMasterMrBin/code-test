/* x6任务调度机制
判断每个执行任务时间是否超过 浏览器每帧时间 1000ms / 60 超过了则将当前任务放到下一个messageChannel创建的task中,
*/

const Scheduler = (queue = []) => {
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = () => {
    while (queue.length > 0) {
      const task = queue.shift();
      let start = performance.now();
      task();
  
      if (performance.now() - start > 1000 / 60) {
        port2.postMessage(null);
        return;
      }
    }
  }

  port2.postMessage(null);
}


const task1 = () => {
  delay(10);
  return 1
};

const task2 = () => {
  delay(20);
  return 2
};

const task3 = () => {
  delay(10);
  return 3
};

const delay = (wait = 1000) => {
  const startTime = performance.now();
  let endTime = startTime;

  while (endTime - startTime < wait) {
    endTime = performance.now();
  }
}

Scheduler([task1, task2, task3]);

