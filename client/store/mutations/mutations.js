export default {
  // mutations中的方法只能接收两个参数，如果非要传国歌参数，也用{a, b, c}这种方式传和接收
  updateCount (state, num) {
    state.count = num
  }
}
