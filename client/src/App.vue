<template>
  <div>
    <Navbar v-bind:page='page' v-on:signout='signout'> </Navbar>
    <LoginForm v-if="page==='login'" v-on:changePage='changePage'> </LoginForm>
    <RegisterForm v-if="page==='register'" v-on:changePage='changePage'> </RegisterForm>
    <Home v-if="page==='home'" 
    v-bind:backlogs="backlogs"
    v-bind:todos="todos"
    v-bind:doingItems="doingItems"
    v-bind:doneItems="doneItems"
    v-on:addTask='addTask'
    v-on:deleteTask='deleteTask'
    v-on:editTask='editTask'
    v-on:todo='todo'
    v-on:getDoing='getDoing'
    v-on:getDone='getDone'
    >
    </Home>
    

  </div>
  
</template>

<script>
import Navbar from './components/Navbar.vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Home from './components/Home.vue';
import axios from 'axios';

export default {
  name: "App",
  components: { 
    LoginForm,
    Navbar,
    RegisterForm,
    Home
    },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      page: 'login',
      backlogs: [],
      todos: [],
      doingItems: [],
      doneItems: []
    };
  },
  methods: {
    changePage(page) {
      this.page = page
      this.homepage()
    },
    homepage() {
      this.fetchBacklogs()
      this.fetchTodos()
      this.fetchDoing()
      this.fetchDone()
    },
    fetchBacklogs() {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/task?q=backlog`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {status: 'backlog'}
      })
      .then(response => {
        this.backlogs = response.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    fetchTodos() {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/task?q=todo`,
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(response => {
        this.todos = response.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    fetchDoing() {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/task?q=doing`,
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(response => {
        this.doingItems = response.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    fetchDone() {
      axios({
        method: 'GET',
        url: `${this.baseUrl}/task?q=done`,
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(response => {
        this.doneItems = response.data
      })
      .catch(err => {
        console.log(err)
      });
    },
    addTask(task) {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/task`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {
          name: task
        }
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err.message)
      });
    },
    todo(id) {
      axios({
        method: 'PATCH',
        url: `${this.baseUrl}/task/${id}`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {status: 'todo'}
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err.message)
      });
    },
    getDoing(id) {
      axios({
        method: 'PATCH',
        url: `${this.baseUrl}/task/${id}`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {status: 'doing'}
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err.message)
      });
    },
    getDone(id) {
      axios({
        method: 'PATCH',
        url: `${this.baseUrl}/task/${id}`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {status: 'done'}
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err.message)
      });
    },
    deleteTask(id) {
      axios({
        method: 'DELETE',
        url: `${this.baseUrl}/task/${id}`,
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err.message)
      });
    },
    editTask({task, id}) {
      axios({
        method: 'PUT',
        url: `${this.baseUrl}/task/${id}`,
        headers: {access_token: localStorage.getItem('access_token')},
        data: {name: task}
      })
      .then(response => {
        this.homepage()
      })
      .catch(err => {
        console.log(err)
      });
    },
    signout() {
      localStorage.clear()
      this.page = 'login'
    }
  },
  created() {
    if (!localStorage.access_token) {
      this.page = 'login'
    } else {
      this.page = 'home'
      this.homepage()
    }
  }
};
</script>

<style scoped>
</style>