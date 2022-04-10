<template>
  <button @click="click" :class="{ clicked: isClick }">
    <i class="el-icon-star-on"></i>
    <span>{{ video.like }}</span>
  </button>
</template>

<script>
import {
  defineComponent,
  ref,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    video: {
      type: Object,
      default: {},
    },
  },
  setup(props, {}) {
    const isClick = ref(false)
    const { video } = toRefs(props)
    const { app } = useContext()
    const click = () => {
      isClick.value = !isClick.value
      app.$like
        .click(video.value.url, isClick.value)
        .then((res) => console.log('result', res))
        .catch((e) => {
          console.log(e)
          // もとに戻す
          isClick.value = !isClick.value
        })
    }
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