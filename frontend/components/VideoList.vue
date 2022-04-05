<template>
  <div>
    <div
      class="iframe-wrapper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="swipe"
    >
      <iframe
        :src="video.url"
        rel="preload"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <p>{{ video.like }}</p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'
import { useTouchHandler } from '~/handler/TouchHandler.js'

const _onMounted = (video, store) => {
  const videos = store.getters['videos/getVideos']
  const v = videos[0]
  video.url = v.url
  video.like = v.like
}

export default defineComponent({
  name: 'VideoList',
  setup() {
    const video = reactive({
      url: '',
      like: 0,
    })
    const { store } = useContext()
    onMounted(() => _onMounted(video, store))
    const { swipe, touchStart, touchMove, touchEnd } = useTouchHandler(video)

    return {
      store,
      video,
      swipe,
      touchStart,
      touchMove,
      touchEnd,
    }
  },
})
</script>

<style scoped>
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
</style>