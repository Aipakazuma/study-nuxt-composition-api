import { ref, useContext } from '@nuxtjs/composition-api'

export function useLikeClickHandler(video) {
  const { app } = useContext()
  const isClick = ref(false)

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
}
