<template>
  <div>
    <div v-for="video in $store.getters['videos/getVideos']" :key="video.url">
      <p>{{ video.url }}</p>
      <p>{{ video.like }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
