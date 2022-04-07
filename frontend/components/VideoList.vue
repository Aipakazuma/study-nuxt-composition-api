<template>
  <div>
    <div class="wrapper">
      <div v-for="v in store.getters['videos/getVideos']" :key="v.url">
        <div class="iframe-wrapper">
          <Video :url="v.url" />
          <ul class="actions">
            <li>
              <i class="el-icon-star-on"></i>
              <span>{{ v.like }}</span>
            </li>
            <li>
              <i class="el-icon-view"></i>
              <span>{{ v.like }}</span>
            </li>
          </ul>
        </div>
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
.wrapper {
  width: 100%; /* 適度な幅を指定 */
  height: 100vh; /* 適度な高さを指定 */
  scroll-snap-type: y mandatory; /* スクロールスナップの指定 */
  overflow: scroll; /* はみ出た部分をスクロールできる要素にする */
}

.wrapper .iframe-wrapper {
  scroll-snap-align: start; /* スクロールスナップの指定 */
  width: 100%; /* 適度な幅を指定 */
  height: 100vh; /* 適度な高さを指定 */
  position: relative;
}

iframe {
  width: 100%;
  height: 100%;
}

.actions {
  position: absolute;
  right: 2%;
  bottom: 15%;
  color: #fff;
  list-style: none;
  text-shadow: 0 1px 3px #000;
}
.actions > li:nth-child(1) {
  margin-bottom: 10px;
}
.actions > li > * {
  display: block;
}
.actions > li > i {
  font-size: 36px;
}
.actions > li > span {
  font-size: 12px;
  text-align: center;
}
</style>