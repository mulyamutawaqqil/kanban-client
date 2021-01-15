const app = new Vue({
    el: '#app',
    data: {
      page: 'login',
      backlogs : [],
      todos : [],
      doing : [],
      dones : [],
      inputBacklog : '',
      user: {
        email: '',
        password: ''
      },
      baseUrl: 'http://localhost:3000'
    },
    methods: {
        changePage(page) {
          this.page = page
        },
        showKanban() {
          this.fetchBacklogs()
          this.fetchTodos()
          this.fetchDoing()
          this.fetchDone()
        },
        register() {
          this.changePage('register')
          const {email, password} = this.user
          axios({
            method: 'post',
            url: `${this.baseUrl}/register`,
            data: {email, password}
          })
          .then(response => {
            this.user.email = ''
            this.user.password = ''
            this.changePage('login')
          })
          .catch(err => {
            console.log(err)
          });
        },
        login() {
          const {email, password} = this.user
          axios({
            method: 'post',
            url: `${this.baseUrl}/login`,
            data: {email, password}
          })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token)
            this.changePage('loggedIn')
            this.showKanban()
            this.user.email = ''
            this.user.password = ''
          })
          .catch(err => {
            console.log(err)
          });
        },
        addBacklog() {
          axios({
            method: 'POST',
            url: `${this.baseUrl}/task`,
            headers: {access_token: localStorage.getItem('access_token')},
            data: {
              name: this.inputBacklog
            }
          })
          .then(response => {
            this.inputBacklog = ''
            this.showKanban()
          })
          .catch(err => {
            console.log(err.message)
          });
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
            this.doing = response.data
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
            this.dones = response.data
          })
          .catch(err => {
            console.log(err)
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
            this.showKanban()
          })
          .catch(err => {
            console.log(err.message)
          });
        },
        doings(id) {
          axios({
            method: 'PATCH',
            url: `${this.baseUrl}/task/${id}`,
            headers: {access_token: localStorage.getItem('access_token')},
            data: {status: 'doing'}
          })
          .then(response => {
            this.showKanban()
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
            this.showKanban()
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
            this.showKanban()
          })
          .catch(err => {
            console.log(err.message)
          });
        },
        editTask(id) {
          console.log(id)
        }
    },
    created() {
      if (!localStorage.getItem('access_token')) {
        this.changePage('login')
      } else {
        this.changePage('loggedIn')
        this.fetchBacklogs()
        this.fetchTodos()
        this.fetchDoing()
        this.fetchDone()
      }
    }
  })