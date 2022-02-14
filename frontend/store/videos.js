export const state = () => ({
  // TODO: child?のstoreをつくって突っ込みたいがやり方がわからない
  videos: [
    {
      url: 'https://www.youtube.com/watch?v=y7PdiGXbrD0',
      like: 0,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/watch?v=0eiMWtOgNFg',
      like: 0,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/watch?v=Bdtkxc-bRLc',
      like: 0,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/watch?v=Rrt3JkuPM4c',
      like: 0,
      favorite: false,
    },
    {
      url: 'https://www.youtube.com/watch?v=l5Sv64Zqpv4',
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
