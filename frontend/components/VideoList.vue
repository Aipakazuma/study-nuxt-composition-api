<template>
  <div>
    <div
      class="iframe-wrapper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="swipe"
    >
      <div v-for="v in store.getters['videos/getVideosN'](3)" :key="v.url">
        <Video :url="v.url" />
        <p>{{ v.like }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import Video from '~/components/Video.vue'
import { useTouchHandler } from '~/handler/TouchHandler.js'

export default defineComponent({
  name: 'VideoList',
  components: { Video },
  setup() {
    const { store } = useContext()
    const { swipe, touchStart, touchMove, touchEnd } = useTouchHandler()

    return {
      store,
      swipe,
      touchStart,
      touchMove,
      touchEnd,
    }
  },
})
</script>

<style scoped>
/*
.iframe-wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.iframe-wrapper iframe {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
}
*/
</style>