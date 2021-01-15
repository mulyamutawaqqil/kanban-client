<template>
  <section id="login-page">
      <div class="row" id="signin">
        <div class="col-md-6">
          <img src="https://images.unsplash.com/photo-1491947153227-33d59da6c448?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2800&q=80" style="width: 100%; object-fit: cover; ">
        </div>
        <div class="col-md-6" style="margin-top: 10%;">
          <p class="fs-2">Welcome back</p>
          <form v-on:submit.prevent='login'>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email-signin" aria-describedby="emailHelp" v-model="email" style="width: 60%;">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="password-signin" v-model="password" style="width: 60%;">
            </div>
            <button type="submit" class="btn btn-primary" id="signin-btn">Sign In</button>
          </form>
          <br>
          <div class="signup-buttons btn btn-outline-primary">
          <a href="#" class="google-signup" @click.prevent="loginWithGoogle">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
          </a>
          </div>
          <div>
            <p>New here? <a href="#" v-on:click='changePage("register")'>Register</a></p>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', 'register')
    },
    login() {
      const {email, password} = this
          axios({
            method: 'post',
            url: `http://localhost:3000/login`,
            data: {email, password}
          })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token)
            this.email = ''
            this.password = ''
            Swal.fire({
              title: 'Success!',
              text: 'Log in successfull',
              icon: 'success'
            })
            this.$emit('changePage', 'home')
          })
          .catch(err => {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error'
            })
          });
    },
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          console.log(GoogleUser)
          axios({
              method: 'post',
              url: `http://localhost:3000/loginGoogle`,
              data:{
                  id_token: GoogleUser.Bc.id_token
              }
          })
          .then(response =>{
              console.log(response)
              localStorage.setItem('access_token', response.data.access_token)
              this.$emit('changePage', 'home')
          })
          .catch(err =>{
              Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error'
              })
          })
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }
}
</script>

<style>

</style>