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
          '--contents-height': getContentsHeight(),
          borderTopLeftRadius: getBorderTopLeftRadius(),
          borderTopRightRadius: getBorderTopRightRadius(),
          backgroundColor: getBackgroundColor(),
          color: getColor(),
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
import { defineComponent, toRefs, watch } from '@nuxtjs/composition-api'
import { useSwipeHandler } from '~/handler/SwipeHandler'

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
    const {
      modal,
      dark,
      fullscreen,
      contentsHeight,
      borderTopRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      contentsColor,
      darkContentsColor,
    } = toRefs(props)

    const {
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
    } = useSwipeHandler(context)

    const getContentsHeight = () => {
      return fullscreen.value
        ? '100%'
        : modalHeight.value > 0
        ? modalHeight.value + 'px'
        : contentsHeight.value
    }

    const getBorderTopLeftRadius = () => {
      return fullscreen.value
        ? '0px'
        : borderTopRadius.value
        ? borderTopRadius.value
        : borderTopLeftRadius.value
    }

    const getBorderTopRightRadius = () => {
      return fullscreen.value
        ? '0px'
        : borderTopRadius.value
        ? borderTopRadius.value
        : borderTopRightRadius.value
    }

    const getBackgroundColor = () => {
      return dark.value ? darkContentsColor.value : contentsColor.value
    }

    const getColor = () => {
      return dark.value ? 'white' : 'back'
    }

    watch(modal, (newModal, oldModal) => {
      if (newModal) {
        open()
      }
    })

    return {
      contentsBottomPosition,
      touchStart,
      touchMove,
      touchEnd,
      mouseUp,
      mouseMove,
      mouseDown,
      close,
      getContentsHeight,
      getBorderTopLeftRadius,
      getBorderTopRightRadius,
      getBackgroundColor,
      getColor,
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