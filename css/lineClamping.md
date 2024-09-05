## css 实现多行文本 展示指定行数 超出字数...展示

[https://css-tricks.com/line-clampin/](https://css-tricks.com/line-clampin/)

```css
.line-clamp-container {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
}
```