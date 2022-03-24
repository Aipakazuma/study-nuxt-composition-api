<template>
  <div
    class="iframe-wrapper"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    ref="swipe"
  >
    <iframe
      :src="video.url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <p>{{ video.like }}</p>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      video: {},
      startX: 0,
      moveX: 0,
      width: 0,
    }
  },
  methods: {
    next() {
      this.$store.dispatch('videos/videoShift').then(
        (res) => {
          this.video = res
        },
        (error) => {
          console.error(error)
        }
      )
    },
    touchStart(e) {
      this.width = this.$refs.swipe.offsetWidth
      this.startX = e.touches[0].pageX
    },
    touchMove(e) {
      this.moveX = e.touches[0].pageX - this.startX
    },
    touchEnd() {
      if (this.moveX > 10) {
        console.log('右スワイプ')
        this.next()
      } else if (this.moveX < -10) {
        console.log('左スワイプ')
      }
    },
  },
  mounted() {
    const videos = this.$store.getters['videos/getVideos']
    this.video = videos[0]
  },
}
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
