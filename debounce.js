const debounce = (fn, wait) => {
  let timer
  return () => {
    clearTimeout(timer);

    timer = setTimeout(fn, wait);
  }
};

const log = () => {
  console.log('log');
}

const debounceFn = debounce(log, 1000);
console.log('x1x')
debounceFn();
debounceFn();
debounceFn();
debounceFn();