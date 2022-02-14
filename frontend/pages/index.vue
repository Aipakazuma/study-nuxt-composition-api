<template>
  <div>
    <div v-for="video in $store.getters['videos/getVideos']" :key="video.url">
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
