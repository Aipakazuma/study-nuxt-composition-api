export const state = () => ({
  // TODO: child?のstoreをつくって突っ込みたいがやり方がわからない
  videos: [
    {
      url: '-e5VYD6gFn4',
      like: 1,
      favorite: false,
    },
    {
      url: '0eiMWtOgNFg',
      like: 2,
      favorite: false,
    },
    {
      url: 'Bdtkxc-bRLc',
      like: 3,
      favorite: false,
    },
    {
      url: 'Rrt3JkuPM4c',
      like: 4,
      favorite: false,
    },
    {
      url: 'l5Sv64Zqpv4',
      like: 0,
      favorite: false,
    },
  ],
})

export const mutations = {
  delLastIndex(state) {
    state.videos.pop()
  },
  unshiftVideo(state, video) {
    state.videos.unshift(video)
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
}

export const getters = {
  getVideos(state) {
    return state.videos
  },
}
