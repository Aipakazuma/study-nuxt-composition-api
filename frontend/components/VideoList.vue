<template>
  <div>
    <div
      class="iframe-wrapper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      ref="swipe"
    >
      <Video :url="url" />
      <p>{{ like }}</p>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
} from '@nuxtjs/composition-api'
import Video from '~/components/Video.vue'
import { useTouchHandler } from '~/handler/TouchHandler.js'

const _onMounted = (url, like, store) => {
  const videos = store.getters['videos/getVideos']
  const v = videos[0]
  url.value = v.url
  like.value = v.like
}

export default defineComponent({
  name: 'VideoList',
  components: { Video },
  setup() {
    const url = ref('')
    const like = ref(0)
    const { store } = useContext()
    onMounted(() => _onMounted(url, like, store))
    const { swipe, touchStart, touchMove, touchEnd } = useTouchHandler(
      url,
      like
    )

    return {
      store,
      swipe,
      touchStart,
      touchMove,
      touchEnd,
      url,
      like,
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