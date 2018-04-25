import Vue from 'vue'
import Router from 'vue-router'
import Login from 'src/components/login/login'
import Home from 'src/components/home/home'
import UserList from 'src/components/user-list/user-list'
import TodoList from 'src/components/todo-list/todo-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'user-list',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'todo-list',
          name: 'TodoList',
          component: TodoList
        }
      ]
    }
  ]
})
