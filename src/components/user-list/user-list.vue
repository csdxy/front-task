<template>
  <div class="user-list">
    <h3>用户列表</h3>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th>账号</th>
          <th>密码</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in this.userData" :key="index">
          <td>{{item.name}}</td>
          <td>{{item.password}}</td>
        </tr>
      </tbody>
    </table>
    <tip ref="tip" :message="msg"></tip>
  </div>
</template>

<script>
import { getUser } from 'api/login'
import Tip from 'base/tip/tip'

export default {
  data() {
    return {
      userData: [],
      msg: ''
    }
  },
  created() {
    this._getUser()
  },
  methods: {
    _getUser() {
      getUser().then(res => {
        if (res.code === 200) {
          this.userData = res.data
        } else {
          this.msg = res.info
          this.$refs.tip.show()
        }
      })
    }
  },
  components: {
    Tip
  }
}
</script>

<style scoped>
.user-list {
  background-color: #fff;
  padding: 20px;
}

.user-list h3 {
  margin-top: 0px;
}
</style>
