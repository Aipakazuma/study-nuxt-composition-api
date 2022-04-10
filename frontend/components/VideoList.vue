<template>
  <div>
    <div class="wrapper">
      <div v-for="v in store.getters['videos/getVideos']" :key="v.url">
        <div class="iframe-wrapper">
          <Video :url="v.url" :key="v.key" />
          <ul class="actions">
            <li>
              <LikeButton :video="v" />
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
import { defineComponent, useContext, onMounted } from '@nuxtjs/composition-api'
import Video from '~/components/Video.vue'
import LikeButton from '~/components/LikeButton'
import { DeviceSize } from '~/utils/DeviceSize'

export default defineComponent({
  name: 'VideoList',
  components: { Video, LikeButton },
  setup() {
    const { store } = useContext()
    const { innerHeight, getScrollTop } = DeviceSize()
    let timeoutId = 0

    onMounted(() => {
      const wrapper = document.getElementsByClassName('wrapper')[0]
      wrapper.addEventListener('scroll', (e) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(function () {
          const scrollTop = getScrollTop('wrapper')
          console.log(scrollTop, innerHeight, scrollTop / innerHeight)
          // TODO: 動画を停止したい
          // iframeだと厳しそうなので、該当するdomを再読み込みしたい
          // これそもそもどこが再生しているかわかるのかしら・・・・？
          store.dispatch('videos/updateKey', { index: scrollTop / innerHeight })
        }, 500)
      })
    })

    // ユーザーが参照しているitemは何番目？
    //

    return {
      store,
    }
  },
})
</script>

<style scoped>
.wrapper::-webkit-scrollbar {
  display: none;
}
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
}
.actions > li:nth-child(1) {
  margin-bottom: 10px;
}
.actions > li > * {
  display: block;
  text-shadow: 0 1px 3px #000;
}
.actions > li > i {
  font-size: 36px;
}
.actions > li > span {
  font-size: 12px;
  text-align: center;
}
</style>