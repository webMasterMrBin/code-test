const throttle = (fn, wait) => {
  let inThrottle;
  return () => {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => {
        fn();
        inThrottle = false;
      }, wait)
    }
  }
};

const log = () => {
  console.log('log');
}

const throttleFn = throttle(log, 1000);

throttleFn()
throttleFn()
throttleFn()