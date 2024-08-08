/* 
  虚拟列表, 作用避免大数据量渲染大数量的dom节点 发生浏览器渲染性能阻塞瓶颈(大量dom节点会导致浏览器布局等算法变慢)
  原理通过只渲染可视区域节点数量的dom来避免 加载大量dom, 并且当视图区域更新时(滚动)动态更新 可视区域的dom内容
  该组件仅为虚拟列表简单实现和原理说明, 生产代码推荐使用成熟且功能丰富的三方库 如 react-window
  dom结构
  1. 最内层可视区域容器 3 高度为可视节点高度总和
  2. 中间层实际滚动元素 2, 高度为所有节点高度和 用于实际滚动 获取scrollTop 注意需要动态设置top以确保 最内容节点容器在可视区域位置展示
  3. 最外层滚动容器 1, 高度为设置的滚动容器高度(固定)
*/
export function VirtualList({ items = datas, itemHeight = 100, containerHeight= 500 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);
  // 高度占位 防止可见高度跳跃
  const invisibleItemsHeight = (startIndex + visibleItems.length - endIndex) * itemHeight;
  const handleScroll = (event) => {
    setScrollTop(event.target.scrollTop);
  };
  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={handleScroll}
      id="1"
    >
      <div id="2" style={{ height: `${items.length * itemHeight}px`, background: 'red' }}>
        <div
          id="3"
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item) => (
            <div key={item} style={{ height: `${itemHeight}px` }}>
              {item}
            </div>
          ))}
        </div>
        <div style={{ height: `${invisibleItemsHeight}px` }} />
      </div>
    </div>
  );
}