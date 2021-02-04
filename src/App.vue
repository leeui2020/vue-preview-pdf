<template>
  <section class="content">
    <vue-preview-pdf :url="pdfURL" width="900px" disabledDownload>
      <!-- <div slot="loading">loading...</div> -->
      <!-- <div slot="pager" slot-scope="scope">{{ scope.current }}/{{ scope.total }}</div> -->
    </vue-preview-pdf>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pdfURL: '/api/13b22ecb0943a41068c09ef0f28a2c01.pdf',
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  background-color: #000;
}

html, body, .content {
  height: 100%;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
