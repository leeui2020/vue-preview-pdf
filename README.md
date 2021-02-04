# VueTextExpand

> Vue组件，用于预览PDF文件。

## 安装
```shell
$ npm i -S @cleexiaohui/vue-preview-pdf
```

## 使用

```js
import Vue from 'vue'
import VuePreviewPDF from '@cleexiaohui/vue-preview-pdf'

Vue.use(VuePreviewPDF)

new Vue({
  data: {
    url: 'path/to/your/file.pdf',
  },
})
```

```html
<vue-preview-pdf :url="url" />
```

### 自定义Loading
```html
<vue-preview-pdf :url="url" customLoading>
  <section slot="loading" slot-scope="scope">
    {{ scope.loading ? '加载中...' : '加载完成' }}
  </section>
</vue-preview-pdf>
```

### 自定义Pager
```html
<vue-preview-pdf :url="url" customPager>
  <section slot="pager" slot-scope="scope" >
    <span>当前在第{{scope.current}}页</span>
    <span>共{{scope.total}}页</span>
  </section>
</vue-preview-pdf>
```

## 属性

|参数|说明|类型|可选值|默认值|
|:-:|:-:|:-:|:-:|:-:|
|url|PDF下载链接|string|——|——|
|width|容器宽度|string|——|100%|
|height|容器高度|string|——|100%|
|background|容器背景色|string|——|#fff|
|custonLoading|使用自定义Loading|boolean|——|false|
|customPager|使用自定义Pager|boolean|——|false|
|disabledDownload|禁止用户下载|boolean|——|false|
