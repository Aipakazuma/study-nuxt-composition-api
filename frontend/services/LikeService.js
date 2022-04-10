export class LikeService {
  constructor(store) {
    this.store = store
  }

  // TODO: $axios.put event
  async put() {
    // TODO: set url, cookie,
  }
  // TODO: $axios.get event
  async get() {}
  // action like count
  async click(url, flag) {
    // TODO: check cookie
    // TODO: is like clicked
    const actionName = flag
      ? 'videos/incrementTargetUrl'
      : 'videos/decrementTargetUrl'
    return new Promise((resolve, reject) => {
      this.store
        .dispatch(actionName, { url: url })
        .then((res) => {
          resolve(true)
        })
        .catch((e) => {
          reject(false)
        })
    })
  }
  // action
}
