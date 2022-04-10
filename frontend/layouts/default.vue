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
      <el-menu id="menu">
        <el-menu-item index="0">
          <a @click="movePage('/')">
            <i class="el-icon-s-home"></i>
            <span>Top</span>
          </a>
        </el-menu-item>
        <el-menu-item index="1">
          <a @click="movePage('/about')">
            <i class="el-icon-document"></i>
            <span>About</span>
          </a>
        </el-menu-item>
        <el-menu-item index="2">
          <a @click="movePage('/contact')">
            <i class="el-icon-user"></i>
            <span>Contact</span>
          </a>
        </el-menu-item>
      </el-menu>
    </SwipeModal>
  </div>
</template>

<script>
import { ref, useRouter, useContext, onMounted } from '@nuxtjs/composition-api'
import SwipeModal from '../components/SwipeModal.vue'
export default {
  components: { SwipeModal },
  setup() {
    const router = useRouter()
    const { store } = useContext()
    const modal = ref(false)
    const menuClick = () => {
      modal.value = true
    }
    const movePage = (link) => {
      console.log(link)
      router.push(link)
      modal.value = false
    }
    onMounted(() => {
      console.log('mounted!')
      store.dispatch('videos/getApi')
    })
    return {
      modal,
      menuClick,
      movePage,
    }
  },
}
</script>

<style scoped>
#body {
  position: relative;
}
#menu a {
  display: block;
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