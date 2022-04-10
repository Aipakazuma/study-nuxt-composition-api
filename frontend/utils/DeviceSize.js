export function DeviceSize() {
  const innerHeight = window.innerHeight
  const getScrollTop = (className) => {
    return document.getElementsByClassName(className)[0].scrollTop
  }
  return {
    innerHeight,
    getScrollTop,
  }
}
