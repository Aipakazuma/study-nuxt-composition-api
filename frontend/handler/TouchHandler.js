import { ref, useContext } from '@nuxtjs/composition-api'

export function useTouchHandler(video) {
  const swipe = ref(null)
  const width = ref(0)
  const startX = ref(0)
  const moveX = ref(0)
  const { store } = useContext()
  const next = () => {
    store.dispatch('videos/videoShift').then(
      (res) => {
        video.url = res.url
        video.like = res.like
      },
      (error) => {
        console.error(error)
      }
    )
  }

  const touchStart = (e) => {
    width.value = swipe.offsetWidth
    startX.value = e.touches[0].pageX
  }

  const touchMove = (e) => {
    moveX.value = e.touches[0].pageX - startX.value
  }

  const touchEnd = () => {
    if (moveX.value > 10) {
      console.log('右スワイプ')
      next()
    } else if (moveX.value < -10) {
      console.log('左スワイプ')
    }
  }

  return {
    touchStart,
    touchMove,
    touchEnd,
  }
}
