<template>
  <div>
    <Navbar v-bind:page='page' v-on:signout='signout' v-if="page==='home'"> </Navbar>
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
import Swal from 'sweetalert2'
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
        console.log(err.response.data.message)
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
        console.log(err.response.data.message)
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
        console.log(err.response.data.message)
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
        console.log(err.response.data.message)
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
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
        Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error'
      })
      });
    },
    signout() {
      localStorage.clear()
      this.page = 'login'
    }
  },
  created() {
    if (!localStorage.access_token) {
      this.changePage('login')
    } else {
      this.changePage('home')
      this.homepage()
    }
  }
};
</script>

<style scoped>
</style>