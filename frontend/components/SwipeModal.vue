<template>
  <div id="modal" @mousemove="mouseMove" @mouseup="mouseUp">
    <transition name="swipe_modal_background">
      <div
        v-if="modal"
        class="modal_background"
        :style="{
          backgroundColor: backgroundColor,
        }"
        @mouseup="persistent ? null : close()"
      />
    </transition>
    <transition name="swipe_modal_contents">
      <div
        v-if="modal"
        ref="modal_contents"
        class="modal_contents"
        :style="{
          width: contentsWidth,
          '--contents-height': fullscreen
            ? '100%'
            : modalHeight > 0
            ? modalHeight + 'px'
            : contentsHeight,
          borderTopLeftRadius: fullscreen
            ? '0px'
            : borderTopRadius
            ? borderTopRadius
            : borderTopLeftRadius,
          borderTopRightRadius: fullscreen
            ? '0px'
            : borderTopRadius
            ? borderTopRadius
            : borderTopRightRadius,
          backgroundColor: dark ? darkContentsColor : contentsColor,
          color: dark ? 'white' : 'back',
          '--contents-bottom-position': contentsBottomPosition,
        }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div
          v-if="!noTip"
          class="modal_contents_chip"
          :style="{
            '--tip-color': tipColor,
          }"
          @mousedown="mouseDown"
        />
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watch } from '@nuxtjs/composition-api'
export default defineComponent({
  model: {
    prop: 'modal',
    event: 'change-modal',
  },
  props: {
    // modal
    modal: Boolean,
    dark: Boolean,
    // modal_background
    persistent: Boolean,
    backgroundColor: {
      type: String,
      default: '#80808080',
    },
    // modal_contents
    fullscreen: Boolean,
    noTip: Boolean,
    contentsWidth: {
      type: String,
      default: '100%',
    },
    contentsHeight: {
      type: String,
      default: '30vh',
    },
    borderTopRadius: {
      type: String,
      default: null,
    },
    borderTopLeftRadius: {
      type: String,
      default: '0px',
    },
    borderTopRightRadius: {
      type: String,
      default: '0px',
    },
    contentsColor: {
      type: String,
      default: 'white',
    },
    tipColor: {
      type: String,
      default: '#c8c8c8',
    },
    darkContentsColor: {
      type: String,
      default: 'black',
    },
  },
  setup(props, context) {
    const isMouseDown = ref(false)
    const isTouch = ref(false)
    const modalQuery = ref(null)
    const modalHeight = ref(0)
    const contentsBottomPosition = ref(0)
    const startMovePosition = ref(0)
    const nowMovePosition = ref(0)
    const moveStartPosition = ref(0)
    const { modal } = toRefs(props)

    const init = () => {
      isMouseDown.value = false
      isTouch.value = false
      modalQuery.value = null
      modalHeight.value = 0
      contentsBottomPosition.value = 0
      startMovePosition.value = 0
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
        moveStartPosition.value = e.touches[0].pageY
        isTouch.value = true
      }
    }
    const touchMove = (e) => {
      if (isTouch.value) {
        nowMovePosition.value = e.touches[0].pageY
        if (moveStartPosition.value - nowMovePosition.value <= 0) {
          contentsBottomPosition.value =
            moveStartPosition.value - nowMovePosition.value
        } else {
          contentsBottomPosition.value = 0 + 'px'
        }
        contentsBottomPosition.value =
          (moveStartPosition.value - nowMovePosition.value <= 0
            ? moveStartPosition.value - nowMovePosition.value
            : 0) + 'px'
      }
    }
    const touchEnd = () => {
      isTouch.value = false
      if (
        -1 * (moveStartPosition.value - nowMovePosition.value) >
        modalHeight.value * (1 / 8)
      ) {
        close()
      } else {
        contentsBottomPosition.value = 0 + 'px'
      }
    }

    const mouseUp = () => {
      isMouseDown.value = false
      if (
        -1 * (moveStartPosition.value - nowMovePosition.value) >
        modalHeight.value * (1 / 8)
      ) {
        close()
      } else {
        contentsBottomPosition.value = 0 + 'px'
      }
    }

    const mouseMove = (e) => {
      if (isMouseDown.value) {
        nowMovePosition.value = e.pageY
        contentsBottomPosition.value =
          (moveStartPosition.value - nowMovePosition.value <= 0
            ? moveStartPosition.value - nowMovePosition.value
            : 0) + 'px'
      }
    }

    const mouseDown = (e) => {
      modalQuery.value = document.querySelector('.modal_contents')
      modalHeight.value = modalQuery.value.getBoundingClientRect().height
      moveStartPosition.value = e.pageY
      isMouseDown.value = true
      close()
    }

    watch(
      () => modal,
      (newModal, oldModal) => {
        if (newModal) {
          open()
        }
      }
    )

    return {
      isMouseDown,
      isTouch,
      modalQuery,
      modalHeight,
      contentsBottomPosition,
      startMovePosition,
      nowMovePosition,
      touchStart,
      touchMove,
      touchEnd,
      mouseUp,
      mouseMove,
      mouseDown,
      close,
    }
  },
})
</script>

<style lang="scss">
#modal {
  position: fixed;
  scrollbar-width: none;
  z-index: 5;
}
.modal_background {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal_contents {
  --contents-height: 30vh;
  --contents-bottom-position: 0%;
  position: fixed;
  z-index: 2;
  min-height: var(--contents-height);
  max-height: 97vh;
  bottom: var(--contents-bottom-position);
  left: 50%;
  transform: translateX(-50%) translateY(0%);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &_chip {
    --tip-color: #c8c8c8;
    z-index: 2;
    position: sticky;
    top: 0px;
    height: 4px;
    width: 100%;
    padding-top: 1vh;
    padding-bottom: 1vh;
    cursor: s-resize;
    &::after {
      position: absolute;
      content: '';
      top: 8px;
      height: 4px;
      width: 40px;
      background-color: var(--tip-color);
      margin-left: calc(50% - 17.5px);
      border-radius: 10px;
    }
  }
}
.swipe_modal_background-enter-active,
.swipe_modal_background-leave-active {
  transition: all 0.15s ease-out;
}
.swipe_modal_background-enter,
.swipe_modal_background-leave-to {
  opacity: 0;
}
.swipe_modal_contents-enter-active {
  transition: all 0.2s ease-out;
}
.swipe_modal_contents-leave-active {
  transition: all 0.15s ease-out;
}
.swipe_modal_contents-enter {
  bottom: calc(-1 * var(--contents-height)) !important;
}
.swipe_modal_contents-enter-to {
  bottom: var(--contents-bottom-position) !important;
}
.swipe_modal_contents-leave {
  bottom: var(--contents-bottom-position) !important;
}
.swipe_modal_contents-leave-to {
  bottom: calc(-1 * var(--contents-height)) !important;
}
</style>