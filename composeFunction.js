const reducer = (state, action) => {
  console.log('reducer action', action);
  return state;
};

const logger1 = reducer => (state, action) => {
  console.log(1);
  return reducer(state, action);
};

const logger2 = reducer => (state, action) => {
  console.log(2);
  return reducer(state, action);
};

const logger3 = reducer => (state, action) => {
  console.log(3);
  return reducer(state, action);
};

const compose = (...args) => {
  return args.reduceRight(
    (acc, cur) => {
      return cur(acc);
    },
  );
};

// logger3(logger2(logger1(reducer)))(1, 2);
const a = compose(logger3, logger2, logger1, reducer);
a('xx', 'f')