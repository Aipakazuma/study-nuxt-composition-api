<template>
  <div>
    <div v-for="video in store.getters['videos/getVideos']" :key="video.url">
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
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'VideoList',
  setup() {
    const video = reactive({
      like: 0,
    })
    const startX = ref(0)
    const moveX = ref(0)
    const width = ref(0)
    const { store } = useContext()
    const next = () => {
      store.dispatch('videos/videoShift').then(
        (res) => {
          video = res
        },
        (error) => {
          console.error(error)
        }
      )
    }
    const touchStart = (e) => {
      width = this.$refs.swipe.offsetWidth
      startX = e.touches[0].pageX
    }
    const touchMove = (e) => {
      moveX = e.touches[0].pageX - startX
    }
    const touchEnd = () => {
      if (moveX > 10) {
        console.log('右スワイプ')
        next()
      } else if (moveX < -10) {
        console.log('左スワイプ')
      }
    }

    // onMounted(() => {
    //   const videos = store.getters['videos/getVideos']
    //   video = videos[0]
    // })

    return {
      store,
      video,
      startX,
      moveX,
      width,
      next,
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