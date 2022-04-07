<template>
  <div id="body">
    <Nuxt />
    <i class="el-icon-menu menu-button" @click="menuClick"></i>
    <SwipeModal v-model="modal" border-top-radius="24px" contents-height="50vh">
      <div style="padding: 24px">
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </div>
    </SwipeModal>
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import SwipeModal from '../components/SwipeModal.vue'
export default {
  components: [SwipeModal],
  setup() {
    const modal = ref(false)
    const menuClick = () => {
      modal.value = true
    }
    return {
      modal,
      menuClick,
    }
  },
}
</script>

<style scoped>
#body {
  position: relative;
}
.menu-button {
  position: absolute;
  right: 2%;
  bottom: 2%;
  font-size: 36px;
  color: #fff;
  text-shadow: 0 1px 3px #000;
}
</style>