<template>
  <div class="home">
    <header class="main-header">
      <a href="javascript:;" class="logo">
        <span class="logo-lg"><b>EMIC</b>NET</span>
      </a>
      <nav class="navbar navbar-static-top">
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li>
              <a href="javascript:;">
                <span>{{userName}}</span>
              </a>
            </li>
            <li>
              <a href="javascript:;" @click="logout">退出</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <aside class="main-sidebar">
      <section class="sidebar">
        <ul class="sidebar-menu">
          <li class="menu-item" :class="{active:itemIndex == 1}" @click="chooseItemIndex(1)"><a href="javascript:;"><i class="fa fa-link"></i> <span>用户列表</span></a></li>
          <li class="menu-item" :class="{active:itemIndex == 2}" @click="chooseItemIndex(2)"><a href="javascript:;"><i class="fa fa-link"></i> <span>代办列表</span></a></li>
        </ul>
      </section>
    </aside>

    <div class="content-wrapper">
      <router-view/>
    </div>
  </div>
</template>
<script>
import { logout } from 'api/login'
export default {
  data() {
    return {
      userName: '用户',
      itemIndex: 1
    }
  },
  created() {
    this.chooseItemIndex(1)
    let userName = sessionStorage.getItem('userName')
    if (userName != null && userName !== '') {
      this.userName = userName
    }
  },
  methods: {
    chooseItemIndex(index) {
      this.itemIndex = index
      if (index === 1) {
        this.$router.push('/home/user-list')
      } else if (index === 2) {
        this.$router.push('/home/todo-list')
      }
    },
    logout() {
      logout().then((res) => {
        if (res.code === 200) {
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>
<style>
.main-header .navbar {
  background-color: #3c8dbc;
}
.main-header .logo {
  background-color: #367fa9;
  color: #fff;
  border-bottom: 0 solid transparent;
}
.main-header .navbar-custom-menu,
.main-header .navbar-right {
  float: right;
}

.navbar-custom-menu .nav.navbar-nav {
  float: left;
}
.navbar-custom-menu .nav.navbar-nav a {
  color: #fff;
}
.nav > li > a:hover,
.nav > li > a:active,
.nav > li > a:focus {
  background-color: #367fa9;
  color: #fff;
}
.main-sidebar {
  background-color: #222d32;
}
.main-sidebar .sidebar {
  padding-bottom: 10px;
}

.main-sidebar .sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
}

.main-sidebar .sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
}
.main-sidebar .sidebar-menu .menu-item a {
  color: #b8c7ce;
  padding-left: 20px;
  border-left: 4px solid transparent;
}
.main-sidebar .sidebar-menu .menu-item.active a {
  background-color: #1e282c;
  color: #fff;
  border-left: 4px solid #3c8dbc;
}
.content-wrapper {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  padding-top: 50px;
  overflow: scroll;
  background-color: #fff !important;
}
</style>
