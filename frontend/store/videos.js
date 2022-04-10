export const state = () => ({
  // TODO: child?のstoreをつくって突っ込みたいがやり方がわからない
  videos: [
    {
      url: 'https://www.youtube.com/embed/-e5VYD6gFn4',
      like: 1,
    },
    {
      url: 'https://www.youtube.com/embed/TES-LcICwy0',
      like: 2,
    },
    {
      url: 'https://www.youtube.com/embed/qoKaSBW1rHs',
      like: 3333,
    },
    {
      url: 'https://www.youtube.com/embed/Rrt3JkuPM4c',
      like: '424k',
    },
    {
      url: 'https://www.youtube.com/embed/l5Sv64Zqpv4',
      like: 0,
    },
    {
      url: 'https://www.dmm.co.jp/litevideo/-/part/=/cid=hjmo00475/size=1280_720/',
      like: 0,
    },
    {
      url: 'https://www.xvideos.com/embedframe/34455359',
      like: 10,
    },
    {
      url: 'https://www.xvideos.com/embedframe/40691309',
      like: 20,
    },
  ],
  targetIndexes: [0, 1, 2],
})

const incrementDecrement = (state, url, flag) => {
  const index = state.videos.findIndex((e) => {
    return e.url === url
  })
  console.log(index, url, flag)
  if (index < 0) {
    return
  }
  if (flag) {
    state.videos[index].like++
  } else {
    state.videos[index].like--
  }
}

export const mutations = {
  unshiftIndexes(state) {
    const n = 3
    const s = state.targetIndexes
      .map((v) => v + 1) // increment
      .filter((v) => v < state.videos.length) // 要素数を超える場合は除外
    if (s.length < n) {
      s.unshift(0) // 除外した分を追加
    }
    console.log(s)
    state.targetIndexes = s
  },
  incrementTargetUrl(state, { url }) {
    incrementDecrement(state, url, true)
  },
  decrementTargetUrl(state, { url }) {
    incrementDecrement(state, url, false)
  },
  getApi(state) {
    for (let i = 0; i < state.videos.length; i++) {
      state.videos[i]['key'] = Date.now()
    }
  },
  updateKey(state, { index }) {
    console.log(state.videos[index])
    state.videos[index].key = Date.now()
    console.log(state.videos[index])
  },
}

export const actions = {
  async videoShift({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('unshiftIndexes')
    })
  },
  async incrementTargetUrl({ commit }, url) {
    commit('incrementTargetUrl', url)
  },
  async decrementTargetUrl({ commit }, url) {
    commit('decrementTargetUrl', url)
  },
  async getApi({ commit }) {
    commit('getApi')
  },
  async updateKey({ commit }, index) {
    commit('updateKey', index)
  },
}

export const getters = {
  getVideos(state) {
    return state.videos
  },
  getVideosN: (state) => (n) => {
    console.log(n)
    return state.targetIndexes.map((index) => state.videos[index])
  },
}
