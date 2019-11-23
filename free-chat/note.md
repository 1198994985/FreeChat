#### router 设计

```javascript
let FUNCTION_ROUTERS = [
  "/",
  "/robot_chat",
  "/group_chat/:to_group_id",
  "/private_chat/:user_id",
  "/setting"
];
// 这里子路由与父路由路径都一样，当匹配到某个特定的地址时,将会同时显示两个子路由
// path 传入数组代表匹配其中一个即可
<Route exact path={FUNCTION_ROUTERS}>
  <Route path={FUNCTION_ROUTERS} exact component={MainView} />
  <Route path={FUNCTION_ROUTERS} exact component={RightView} />
</Route>;
```

#### input:placeholder-shown 伪类

/_ placeholder-shown 伪类，当 placaholder 有值时显示时的效果，当有文字输入到文本框时，效果消失 _/

- https://segmentfault.com/a/1190000019452616

#### touch-action

// 待解决
解决移动端点击事件延迟

#### outline

css 属性，解决点击 input 栏后的出现蓝色边框的问题

#### input 输入框自动填充黄色解决方案

#### text-transform

控制文本的大小写

#### text-indent

控制文本缩进

#### text-shadow

控制文本阴影

#### letter-spacing

字符间的间距

#### Text-rendering

告诉渲染引擎渲染文字的时候如何来优化

#### word-spacing

单词间的间距

#### font-variant

待解决

#### font-feature-settings

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings

#### input 属性: autocomplete

#### react label 中的 for 改为 htmlFor

#### 跨域问题

```
// 前端代码
axios({
        method: 'GET',
        url,
        data:{ // 配置对象
          params: data // 指定请求参数
        },
        withCredentials:true
      })

// 后端代码
app.use(async (ctx, next) => {
  // if (ctx.request.header.origin !== ctx.origin && whiteList.includes(ctx.request.header.origin)) {
  console.log(ctx.header.origin);
  ctx.set("Access-Control-Allow-Headers", ["*"]);
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  // }

  await next();
});
```

#### 整体布局 css 提到最外面，方便写 mobile 与 web 端

#### <link href='./xx.css'> 为什么把·去掉就好了<link href='/xx.css'>

#### 禁止文字被选中

```css
// 禁止文字被选中
/*火狐*/
-moz-user-select: none;
/*webkit浏览器*/
-webkit-user-select: none;
/*IE10*/
-ms-user-select: none;
/*早期浏览器*/
-khtml-user-select: none;
user-select: none;

// 移动端 禁止文字被选中
-webkit-touch-callout: none;

```

#### 全局选中文字颜色

```
::selection {
  color: #fff;
	background: rgb(94, 150, 252) !important;
}
```

#### 禁止图片被拖动

img 加上 draggable="false"

####  caret-color: 改变input中的光标的颜色
#### 将滚动条滑到底部
```
    // 将滚动条滑倒底部
    const scroll = document.getElementById('testt')
    // scroll.scrollTop = scroll.scrollHeight
    scroll.children[scroll.children.length-1].scrollIntoView();
```
#### 当401状态码时,显示请求头五orign,原因是忘记在服务端单独处理状态码.

#### 获取时间
function time(time = +new Date()) {

  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时

  return date.toJSON().substr(0, 19).replace('T', ' ');
}
