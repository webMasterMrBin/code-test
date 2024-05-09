const b = () => {
  console.log('b')
}

const c = () => {
  console.log('c')
  b();

}
const a = () => {
  console.log('x')
  c();
  console.log('a')
}

a();

/* 
  1.全局代码开始执行，调用 a()：
  执行a() log('x')
  调用栈：Global -> a

  2.在 a() 内部，调用 c()：
  调用栈：Global -> a -> c
  
  3. 执行 c()，首先打印 'c' 到控制台：
  控制台输出：c
  调用栈：Global -> a -> c

  4. 在 c() 内部，调用 b()：
  调用栈：Global -> a -> c -> b

  5. 执行 b()，打印 'b' 到控制台：
  控制台输出：c, b
  调用栈：Global -> a -> c
  
  6.b() 执行结束，c() 的其余部分已执行完毕，c() 完成执行：
  调用栈：Global -> a

  7. 回到 a() 内部，执行 a() 剩余部分，打印 'a' 到控制台：

  控制台输出：c, b, a
  调用栈：Global
*/


