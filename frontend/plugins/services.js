import { LikeService } from '../services/LikeService'

export default ({ store }, inject) => {
  const like = new LikeService(store)
  inject('like', like)
}
