const delay = (wait = 1000) => {
  const startTime = performance.now();
  let endTime = startTime;

  while (endTime - startTime < wait) {
    endTime = performance.now();
  }
}

const task1 = () => {
  delay(100);
  return 1
};

const task2 = () => {
  delay(200);
  return 2
};

const task3 = () => {
  delay(300);
  return 3
};

const task4 = () => {
  delay(400);
  return 4
};

const task5 = () => {
  delay(500);
  return 5
};

const SchedulerTaskcheduler = () => {
  const taskQueue = [];
  const scheduleIds = [];
  const taskFnExecutedMap = new Map();

  const addTask = (task) => {
    taskQueue.push(task);
    taskFnExecutedMap.set(task, false);
  };

  const clear = () => {
    // 内存清理
    taskQueue.length = 0;
    scheduleIds.length = 0;
    taskFnExecutedMap.clear();
  };

  /* 更新任务队列 */
  const flushTask = (deadLine) => {
    while (taskQueue.length > 0) {
      // 如果没有剩余升级执行 则将队列第一个任务排到下个idle执行
      if (deadLine.timeRemaining() <= 5) {
        scheduleIds.push(requestIdleCallback(flushTask));
        return;
      }
      const taskFn = taskQueue.shift();
      taskFn();
      taskFnExecutedMap.set(taskFn, true);
    }

    // clear();
  };

  const start = () => {
    scheduleIds.push(requestIdleCallback(flushTask));
  };

  const stop = () => {
    scheduleIds.forEach(id => cancelIdleCallback(id));

    for (const [taskFn, isExecuted] of taskFnExecutedMap) {
      if (!isExecuted) {
        taskFn();
      }
    }
    clear();
  }

  return {
    start,
    addTask,
    stop,
    clear,
  }
};

// const { start, addTask } = SchedulerTask();

// addTask(task1);

// addTask(task2);
// addTask(task3);
// addTask(task4);
// addTask(task5);

// start();
