<template>
  <div id="body">
    <Nuxt />
    <i class="el-icon-menu menu-button" @click="menuClick"></i>
    <SwipeModal
      v-model="modal"
      contents-height="97vh"
      contents-width="100%"
      border-top-radius="20px"
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span>About</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-user"></i>
          <span>Contact</span>
        </el-menu-item>
      </el-menu>
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