import { ref } from '@nuxtjs/composition-api'

export function useSwipeHandler(context) {
  const isMouseDown = ref(false)
  const isTouch = ref(false)
  const modalQuery = ref(null)
  const modalHeight = ref(0)
  const contentsBottomPosition = ref(0)
  const nowMovePosition = ref(0)
  let moveStartPosition = 0

  const init = () => {
    isMouseDown.value = false
    isTouch.value = false
    modalQuery.value = null
    modalHeight.value = 0
    contentsBottomPosition.value = '0px'
    nowMovePosition.value = 0
  }

  const open = () => {
    init()
    document.documentElement.style.overflowY = 'hidden'
  }

  const close = () => {
    isMouseDown.value = false
    isTouch.value = false
    document.documentElement.style.overflowY = 'auto'
    context.emit('change-modal', false)
  }

  const touchStart = (e) => {
    modalQuery.value = document.querySelector('.modal_contents')
    modalHeight.value = modalQuery.value.getBoundingClientRect().height
    if (modalQuery.value.scrollTop <= 0) {
      moveStartPosition = e.touches[0].pageY
      isTouch.value = true
    }
  }
  const touchMove = (e) => {
    if (isTouch.value) {
      nowMovePosition.value = e.touches[0].pageY
      if (moveStartPosition - nowMovePosition.value <= 0) {
        contentsBottomPosition.value = moveStartPosition - nowMovePosition.value
      } else {
        contentsBottomPosition.value = 0 + 'px'
      }
      contentsBottomPosition.value =
        (moveStartPosition - nowMovePosition.value <= 0
          ? moveStartPosition - nowMovePosition.value
          : 0) + 'px'
    }
  }
  const judgeClose = (isUserAction) => {
    isUserAction.value = false
    if (
      -1 * (moveStartPosition - nowMovePosition.value) >
      modalHeight.value * (1 / 8)
    ) {
      close()
    } else {
      contentsBottomPosition.value = 0 + 'px'
    }
  }

  const touchEnd = () => {
    judgeClose(isTouch)
  }

  const mouseUp = () => {
    judgeClose(isMouseDown)
  }

  const mouseMove = (e) => {
    if (isMouseDown.value) {
      nowMovePosition.value = e.pageY
      contentsBottomPosition.value =
        (moveStartPosition - nowMovePosition.value <= 0
          ? moveStartPosition - nowMovePosition.value
          : 0) + 'px'
    }
  }

  const mouseDown = (e) => {
    modalQuery.value = document.querySelector('.modal_contents')
    modalHeight.value = modalQuery.value.getBoundingClientRect().height
    moveStartPosition = e.pageY
    isMouseDown.value = true
    close()
  }

  return {
    open,
    close,
    touchStart,
    touchMove,
    touchEnd,
    mouseUp,
    mouseMove,
    mouseDown,
    modalHeight,
    contentsBottomPosition,
  }
}
