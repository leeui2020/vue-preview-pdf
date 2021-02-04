<template>
  <section class="clxh-preview" :style="rootStyle">
    <template v-if="loading">
      <slot name="loading" v-if="customLoading"></slot>
      <section class="clxh-preview-loading" v-else>
        <div class="clxh-preview-loading-icon"></div>
        <div class="clxh-preview-loading-icon"></div>
        <div class="clxh-preview-loading-icon"></div>
      </section>
    </template>
    <section ref="scroll" class="clxh-preview-scroll">
      <section class="clxh-preview-wrapper" v-if="imageList.length">
        <aside class="clxh-preview-item"
          v-for="(item, index) of imageList"
          :key="index"
          ref="items">
          <img :src="item" :class="disabledDownload ? 'disabled' : ''" alt="" class="clxh-preview-image">
        </aside>
      </section>
    </section>
    <!-- 页码 -->
    <template v-if="numPages">
      <slot name="pager" :current="currentPage" :total="numPages" v-if="customPager"></slot>
      <section class="clxh-preview-pager" v-else>
        <span class="clxh-preview-pager-item">{{ currentPage + 1 }}</span>
        <span>/</span>
        <span class="clxh-preview-pager-item">{{ numPages }}</span>
      </section>
    </template>
  </section>
</template>

<script>
import * as utils from './utils'

export default {
  name: 'VuePreviewPdf',
  props: {
    // pdf下载地址
    url: {
      type: String,
      required: true,
    },
    // 设置外层容器宽度
    width: {
      type: String,
      default: '100%',
    },
    // 设置外层容器高度
    height: {
      type: String,
      default: '100%',
    },
    // 设置外层容器背景色
    background: {
      type: String,
      default: '#fff',
    },
    // 自定义Loading
    customLoading: {
      type: Boolean,
      default: false,
    },
    // 自定义页脚
    customPager: {
      type: Boolean,
      default: false,
    },
    // 禁止下载
    disabledDownload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      // 转换出来的图片
      imageList: [],
      // 当前浏览的页码
      currentPage: 0,
    }
  },
  computed: {
    rootStyle() {
      return {
        '--width': this.width,
        '--height': this.height,
        '--background': this.background,
      }
    },
    // 总页数
    numPages() {
      return this.imageList.length
    },
  },
  created() {
    this.getImageList()
  },
  mounted() {
    this._handlerScroll = this.handlerScroll.bind(this)
    this.$refs.scroll.addEventListener('scroll', this._handlerScroll)
  },
  beforeDestroy() {
    this.$refs.scroll.removeEventListener('scroll', this._handlerScroll)
    this._handlerScroll = null
  },
  methods: {
    // 获取转换出来的图片
    getImageList() {
      this.$emit('loadStart')
      this.loading = true
      return utils.pdfToImage(this.url).then(list => {
        this.imageList = list
        this.loading = false
      })
    },
    handlerScroll(e) {
      const wrapper = this.$el
      const items = this.$refs.items
      const {
        top: wrapperTop,
        height: wrapperHeight,
      } = wrapper.getBoundingClientRect()
      let currentIndex = this.currentPage
      let currentItem = items[currentIndex]
      
      while (true) {
        if (!currentItem) break
        const rect = currentItem.getBoundingClientRect()
        if (rect.top + rect.height <= wrapperTop) {
          currentIndex ++
        } else if (rect.top >= wrapperTop + wrapperHeight) {
          currentIndex --
        } else {
          break
        }
        currentItem = items[currentIndex]
      }

      this.currentPage = currentIndex
    },
  },
}
</script>

<style lang="scss">
@keyframes clxh-icon {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

.clxh-preview {
  width: var(--width);
  height: var(--height);
  position: relative;
  overflow: hidden;
  background-color: var(--background);

  &-wrapper,
  &-item {
    width: 100%;
    position: relative;
  }

  &-image {
    width: 100%;
    position: relative;
    &.disabled {
      pointer-events: none;
    }
  }

  &-loading {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      --s: 16px;
      width: var(--s);
      height: var(--s);
      border-radius: 100%;
      background-color: #e2e3e4;
      margin: 0 8px;
      animation: clxh-icon .9s infinite linear;
      &:nth-child(2) {
        animation-delay: .3s;
      }
      &:nth-child(3) {
        animation-delay: .6s;
      }
    }
  }

  &-pager {
    --h: 30px;
    top: 8px;
    left: 8px;
    height: var(--h);
    line-height: var(--h);
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
    padding: 0 10px;
    border-radius: var(--h);
  }

  &-scroll {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
  }
}
</style>
