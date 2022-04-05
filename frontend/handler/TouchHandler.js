import { ref, useContext } from '@nuxtjs/composition-api'

export function useTouchHandler() {
  const swipe = ref(null)
  let width = 0
  let startX = 0
  let moveX = 0
  const { store } = useContext()
  const next = () => {
    store.dispatch('videos/videoShift2')
  }

  const touchStart = (e) => {
    width = swipe.offsetWidth
    startX = e.touches[0].pageX
  }

  const touchMove = (e) => {
    moveX = e.touches[0].pageX - startX
  }

  const touchEnd = () => {
    if (moveX > 10) {
      console.log('右スワイプ')
      next()
    } else if (moveX < -10) {
      console.log('左スワイプ')
    }
  }

  return {
    swipe,
    touchStart,
    touchMove,
    touchEnd,
  }
}
