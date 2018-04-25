<template>
  <div class="todo-list">
    <h1>todos</h1>
    <div class="todo-centent">
      <input id="select-all" type="checkbox" class="select-all" v-model="selectAll">
      <label for="select-all"></label>
      <input v-model.trim="inputData" type="text" class="todo-add" placeholder="What needs to be done?" @keyup.enter="addTodos">
      <div class="todo-menu">
        <ul>
          <li class="menu-item" v-for="(item, index) in todoData" :key="index" v-show="showTodo(item)" :class="{editing:todoEidtData == item}">
            <div class="view">
              <input class="checkbox" type="checkbox" v-model="item.completed">
              <label @dblclick="editDataFn(item)">{{item.inputData}}</label>
              <a href="javascript:;" class="close" @click="deleteData(index)">x</a>
            </div>
            <input v-model="editData" class="edit" type="text" v-todo-focus="todoEidtData == item" @blur="doneEdit(item)" @keyup.enter="doneEdit(item)" @keyup.esc="cancelEdit(item)">
          </li>
        </ul>
      </div>
      <div class="footer" v-show="todoData.length > 0">
        <span class="count"><span>{{checkedLen}}</span> iterms left</span>
        <ul class="center">
          <li><a href="javascript:;" :class="{selected:mode == 'All'}" @click="selectMode('All')">All</a></li>
          <li><a href="javascript:;" :class="{selected:mode == 'Active'}" @click="selectMode('Active')">Active</a></li>
          <li><a href="javascript:;" :class="{selected:mode == 'Completed'}" @click="selectMode('Completed')">Completed</a></li>
        </ul>
        <a class="clear" href="javascript:;" @click="clearCompleted(false)">Clear completed</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'All',
      todoData: [],
      inputData: '',
      editData: '',
      todoEidtData: null
    }
  },
  created() {
    this.userName = sessionStorage.getItem('userName')
    var todoData = JSON.parse(localStorage.getItem('todoData' + this.userName))
    if (todoData instanceof Array) {
      this.todoData = todoData
    }
  },
  computed: {
    checkedLen() {
      var num = 0
      this.todoData.forEach(v => {
        if (!v.completed) {
          num++
        }
      })
      return num
    },
    selectAll: {
      get() {
        return this.todoData.every(v => {
          return v.completed
        })
      },
      set(val) {
        this.todoData.forEach(v => {
          v.completed = val
        })
      }
    }
  },
  methods: {
    selectMode(mode) {
      this.mode = mode
    },
    addTodos() {
      if (this.inputData == null || this.inputData === '') {
        return
      }
      this.todoData.push({ inputData: this.inputData, completed: false })
      this.inputData = ''
    },
    showTodo(item) {
      if (this.mode === 'All') {
        return true
      } else if (this.mode === 'Active') {
        return !item.completed
      } else if (this.mode === 'Completed') {
        return item.completed
      } else {
        return false
      }
    },
    clearCompleted(completed) {
      this.todoData = this.todoData.map(v => {
        v.completed = completed
        return v
      })
    },
    deleteData(index) {
      this.$delete(this.todoData, index)
    },
    storeData() {
      localStorage.setItem('todoData' + this.userName, JSON.stringify(this.todoData))
    },
    editDataFn(item) {
      this.todoEidtData = item
      this.editData = item.inputData
    },
    doneEdit(item) {
      if (!this.todoEidtData) {
        return
      }
      this.todoEidtData = null
      item.inputData = this.editData.trim()
      this.storeData()
    },
    cancelEdit: function (item) {
      this.todoEidtData = null
    }
  },
  watch: {
    todoData() {
      this.storeData()
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped>
.todo-list {
  background-color: #fff;
  padding: 20px;
  margin: 0 auto;
  width: 550px;
}

.todo-list h1 {
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  margin-top: 0px;
}
.todo-centent {
  background: #fff;
  margin: 10px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.select-all {
  text-align: center;
  border: none;
  opacity: 0;
  position: absolute;
}
.select-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: 14px;
  left: -8px;
  transform: rotate(90deg);
}
.select-all + label::before {
  content: "❯";
  font-size: 22px;
  color: rgb(230, 230, 230);
  padding: 10px 27px;
}
.select-all:checked + label:before {
  color: #737373;
}
.todo-add {
  width: 100%;
  margin: 0;
  padding: 16px 16px 16px 60px;
  font-weight: 100;
  font-size: 24px;
  outline: 0;
}
.todo-menu {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
}
.menu-item {
  position: relative;
  font-size: 24px;
  border-top: 1px solid #ededed;
}
.menu-item .checkbox {
  opacity: 0;
  text-align: center;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
}
.menu-item label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 100;
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}
.menu-item .checkbox:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
  color: #d9d9d9;
  text-decoration: line-through;
}
.menu-item:hover .close {
  display: block;
}
.menu-item .edit {
  display: none;
  position: relative;
  margin: 0;
  width: 466px;
  font-size: 24px;
  font-weight: 100;
  line-height: 1.4em;
  border: 0;
  padding: 13px 16px;
  border: 1px solid #999;
  box-sizing: border-box;
  margin-left: 44px;
}
.menu-item.editing .view {
  display: none;
}
.menu-item.editing .edit {
  display: block;
}
.close {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  font-size: 30px;
  color: #cc9a9a;
  font-weight: 100;
  margin-top: 10px;
  transition: color 0.2s ease-out;
}
.footer {
  color: #777;
  padding: 10px 15px;
  height: 40px;
  text-align: center;
  font-weight: 100;
}
.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
.footer .count {
  float: left;
  text-align: left;
}

.footer .center {
  position: absolute;
  left: 0px;
  right: 0px;
}
.footer .center li {
  display: inline-block;
}
.footer .center li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}
.footer .center li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
.footer .clear {
  position: relative;
  float: right;
  color: #777;
  text-decoration: none;
  cursor: pointer;
}
.footer .clear:hover {
  text-decoration: underline;
}

input {
  border: 0px;
}
input::-webkit-input-placeholder {
  color: #d9d9d9;
}
input::-moz-placeholder {
  color: #d9d9d9;
}
input:-moz-placeholder {
  color: #d9d9d9;
}
input:-ms-input-placeholder {
  color: #d9d9d9;
}

input:active,
input:focus {
  outline: 0px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
