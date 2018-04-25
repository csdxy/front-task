<template>
  <transition name="fade">
    <div v-show="flag" class="tool-tip">
      <span class="tool-tip-msg">{{message}}</span>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    show() {
      if (this.flag) {
        return
      }
      this.flag = true
      var timer = setTimeout(() => {
        this.hide(timer)
      }, 1000)
    },
    hide(timer) {
      this.flag = false
      clearInterval(timer)
    }
  }
}
</script>
<style>
.tool-tip {
  position: fixed;
  top: 20%;
  left: 0;
  text-align: center;
  padding: 20px;
  width: 100%;
  z-index: 10002;
}
.tool-tip-msg {
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
