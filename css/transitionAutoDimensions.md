## css的 高度/宽度 伸缩动画(antd的Collapse组件的动画效果)

[https://css-tricks.com/using-css-transitions-auto-dimensions/](https://css-tricks.com/using-css-transitions-auto-dimensions/)

```css
  /* 省事的方法 使用max-height (对于动态内容不太友好可能会超出最大max-height设置) */
  .section {
    overflow: hidden;
    transition: max-height 0.3s ease-out; // note that we're transitioning max-height, not height!
    height:auto;
    max-height: 600px; // still have to hard-code a value!
  }
  .section.collapsed {
    max-height:0;
  }
```

```js
  /* 可以根据js精确控制动态内容的伸缩动画 缺点是 代码多 易出现bug */
  /* 基本思路
  1. 触发鼠标事件如单击时 通过js设置元素的height(通过scrollHeight获取), 和设置trisiion
  2. 通过一个js变量判断是展开还是收起
  3. 收起后需要监听 transitionend事件 在事件结束后 还原元素高度
  */

  // 收起 ref为react dom ref
  const collapseContainer = () => {
    // 双RAF确保动画效果
    requestAnimationFrame(() => {
      // 第一个raf设置初始高度
      ref.current!.style.height = `${ref.current!.scrollHeight}px`;
      ref.current!.style.opacity = '1';
      requestAnimationFrame(() => {
        ref.current!.style.height = '0px';
        ref.current!.style.opacity = '0';
      });
    });
  };

  // 展开ref为react dom ref
  const expandContainer = () => {
    ref.current!.style.height = `${ref.current!.scrollHeight}px`;
    ref.current!.style.opacity = '1';

    const handleTransitionend = () => {
      // 展开后移除transitionend事件, 确保不会重复注册
      ref.current!.removeEventListener('transitionend', handleTransitionend);

      ref.current!.style.height = 'auto';
    };

    ref.current!.addEventListener('transitionend', handleTransitionend);
  };
```