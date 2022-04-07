<template>
  <div>
    <div class="iframe-wrapper">
      <div v-for="v in store.getters['videos/getVideos']" :key="v.url">
        <Video :url="v.url" />
        <p>{{ v.like }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Video from '~/components/Video.vue'

export default defineComponent({
  name: 'VideoList',
  components: { Video },
  setup() {
    const { store } = useContext()

    return {
      store,
    }
  },
})
</script>

<style scoped>
.iframe-wrapper {
  width: 100%; /* 適度な幅を指定 */
  height: 100vh; /* 適度な高さを指定 */
  scroll-snap-type: y mandatory; /* スクロールスナップの指定 */
  overflow: scroll; /* はみ出た部分をスクロールできる要素にする */
}

.iframe-wrapper div {
  scroll-snap-align: start; /* スクロールスナップの指定 */
  width: 100%; /* 適度な幅を指定 */
  height: 100vh; /* 適度な高さを指定 */
  text-align: center; /* 文字を左右中央にするため */
  line-height: 100vh; /* 文字を上下中央にするため */
}

.iframe-wrapper div:nth-of-type(even) {
  background: #ccc; /* 偶数番の背景色 */
}
.iframe-wrapper div:nth-of-type(odd) {
  background: #aaa; /* 奇数番の背景色 */
}

iframe {
  width: 100%;
  height: 100%;
}
</style>