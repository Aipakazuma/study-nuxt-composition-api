export const state = () => ({
  // TODO: child?のstoreをつくって突っ込みたいがやり方がわからない
  videos: [
    {
      url: '-e5VYD6gFn4',
      like: 0,
      favorite: false,
    },
    {
      url: '0eiMWtOgNFg',
      like: 0,
      favorite: false,
    },
    {
      url: 'Bdtkxc-bRLc',
      like: 0,
      favorite: false,
    },
    {
      url: 'Rrt3JkuPM4c',
      like: 0,
      favorite: false,
    },
    {
      url: 'l5Sv64Zqpv4',
      like: 0,
      favorite: false,
    },
  ],
})

export const mutations = {}

export const getters = {
  getVideos(state) {
    return state.videos
  },
}
