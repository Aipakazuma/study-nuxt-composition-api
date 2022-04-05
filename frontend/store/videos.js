export const state = () => ({
  // TODO: child?のstoreをつくって突っ込みたいがやり方がわからない
  videos: [
    {
      url: 'https://www.youtube.com/embed/-e5VYD6gFn4',
      like: 1,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/embed/0eiMWtOgNFg',
      like: 2,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/embed/Bdtkxc-bRLc',
      like: 3,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/embed/Rrt3JkuPM4c',
      like: 4,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/embed/l5Sv64Zqpv4',
      like: 0,
      favorite: false,
    },
    {
      url: 'https://www.dmm.co.jp/litevideo/-/part/=/cid=hjmo00475/size=1280_720/',
      like: 0,
      favorite: false,
    },
  ],
  targetIndexes: [0, 1, 2],
})

export const mutations = {
  delLastIndex(state) {
    state.videos.pop()
  },
  unshiftVideo(state, video) {
    state.videos.unshift(video)
  },
  unshiftIndexes2(state) {
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
}

export const actions = {
  async videoShift({ commit, state }) {
    // TODO: 値を変更しながら且つ返り値もほしいみたいな処理を書きたい場合のbest practiceを探したい
    return new Promise((resolve, reject) => {
      // やりたいこと
      // const last = videos.pop()
      const last = state.videos.slice(-1)[0]
      commit('delLastIndex')
      // videos.unshift(last)
      commit('unshiftVideo', last)
      resolve(last)
    })
  },
  async videoShift2({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('unshiftIndexes2')
    })
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
