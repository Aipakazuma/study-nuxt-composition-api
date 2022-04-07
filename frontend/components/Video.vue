<template>
  <iframe
    :src="url"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  ></iframe>
</template>

<script>
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  setup(props, {}) {
    const { url } = toRefs(props)
    const _url = computed(() => {
      return url.value
    })
    return {
      _url,
    }
  },
})
</script>