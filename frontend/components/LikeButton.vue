<template>
  <button @click="click" :class="{ clicked: isClick }">
    <i class="el-icon-star-on"></i>
    <span>{{ video.like }}</span>
  </button>
</template>

<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import { useLikeClickHandler } from '~/handler/LikeClickHandler'

export default defineComponent({
  props: {
    video: {
      type: Object,
      default: {},
    },
  },
  setup(props, {}) {
    const { video } = toRefs(props)
    const { click, isClick } = useLikeClickHandler(video)
    return {
      click,
      isClick,
    }
  },
})
</script>

<style scoped>
button {
  border: none;
  padding: 0;
  background: transparent;
}
i,
span {
  display: block;
  text-shadow: 0 1px 3px #000;
  color: #fff;
}
i {
  font-size: 36px;
}
.clicked i {
  color: #ff8bd1;
}
span {
  font-size: 12px;
  text-align: center;
}
</style>