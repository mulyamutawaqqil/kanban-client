<template>
    <section id="register-page">
      <div class="row" id="signin">
        <div class="col-md-4"></div>
        <div class="col-md-4" style="margin-top: 10%;">
          <p class="fs-2">Register</p>
          <form v-on:submit.prevent='register'>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email-signin" aria-describedby="emailHelp" v-model='email'>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="password-signin" v-model='password'>
            </div>
            <button type="submit" class="btn btn-primary" id="signin-btn">Sign In</button>
          </form>
          <br>
        </div>
        <div class="col-md-4"></div>
      </div>
    </section>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      const {email, password} = this
      console.log({email, password})
      axios({
        method: 'post',
        url: `http://localhost:3000/register`,
        data: {email, password}
      })
      .then(response => {
        this.email = ''
        this.password = ''
        this.$emit('changePage', 'login')
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