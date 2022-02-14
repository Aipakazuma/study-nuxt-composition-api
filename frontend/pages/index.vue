<template>
  <div>
    <iframe
      width="560"
      height="315"
      :src="'https://www.youtube.com/embed/' + video.url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <p>{{ video.like }}</p>
    <button @click="next">次へ</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: function () {
    return {
      video: {},
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
  },
  mounted() {
    const videos = this.$store.getters['videos/getVideos']
    this.video = videos[0]
  },
}
</script>
