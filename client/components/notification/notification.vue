<template>
  <transition name="fade">
    <div class="notification">
      <span class="content">{{content}}</span>
      <a class="btn" @click='handleClose'>{{btn}}</a>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault() // 把元素的默认事件注释掉
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus">
.notification
  display: flex
  background-color: #303030
  color: rgba(225, 225, 255, 1)
  align-items: center
  padding: 20px
  position: fixed
  min-width: 280px
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0 rgba(0, 0, 0, 0.2)
  flex-wrap: wrap
  transition: all .3s
  .content
    padding: 0
  .btn
    color: #ff4081
    padding-left: auto
    cursor: pointer
</style>
