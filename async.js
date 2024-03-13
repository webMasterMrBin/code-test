const a = new Promise(res => {
  setTimeout(() => {
    console.log(1)
    res(1);
  }, 3000)
});

// 未catch, .then 第二参数也没有处理catch promise状态为reject
const b = new Promise((res, rej) => {
  setTimeout(() => {
    console.log(2)
    rej(2);
  }, 10000)
})

const c = new Promise(res => {
  setTimeout(() => {
    console.log(3);
    res(3);
  }, 500)
});

// 由于catch处理同时有return值, promise为fullfill
const d = new Promise((res, rej) => {
  setTimeout(() => {
    console.log(4)
    rej(4);
  }, 5000)
}).catch(d => d);

const e = new Promise(res => {res(5)});

const arr = [a, b, c, d, e];

// (async () => {
//   for await (const v of arr) {
//     console.log('v', v)
//   }
// })()


/* awit等待a执行的3s内  b,c的 timeout已经走完 但是res还在等待await a完成 */
// const fun = async () => {
//   for (const v of arr) {
//     const result = await v;
//     console.log('result', result);
//   }
// }

// fun();

/* 
 3
 2
 1
 result1
 result2
 result3
*/

// 所有promise都是fullfill 否则只要有一个reject就是reject(需要等待所有promise执行完 知道有一个状态是reject终止), 有一个是pending就是pending
// (async () => {
//   const result = await Promise.all(arr);

//   console.log('result1', result)
// })()

// 有一个是pending就是pending 否则 就是fullfill
// const result = Promise.allSettled(arr);

// console.log('result1', result)

// 第一个返回是reject就是reject 第一个返回是fullfill就是fullfill
// Promise.race(arr);

// 有一个返回fullfill就是fullfill 全部是reject就是reject
// Promise.all(arr);