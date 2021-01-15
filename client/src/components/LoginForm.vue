<template>
  <section id="login-page">
      <div class="row" id="signin">
        <div class="col-md-4"></div>
        <div class="col-md-4" style="margin-top: 10%;">
          <p class="fs-2">Login</p>
          <form v-on:submit.prevent='login'>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email-signin" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="password-signin" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary" id="signin-btn">Sign In</button>
          </form>
          <br>
          <div>
            <p>New here? <a href="#" v-on:click='changePage("register")'>Register</a></p>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </section>
</template>

<script>
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
            this.$emit('changePage', 'home')
          })
          .catch(err => {
            console.log(err)
          });
    }
  }
}
</script>

<style>

</style>