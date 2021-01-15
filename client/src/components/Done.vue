<template>
    <div class="col-md-3">
          <div class="card bg-light">
              <div class="card-body">
                  <h6 class="card-title text-uppercase text-truncate py-2">Done</h6>
                  <div class="items border border-dark" v-for="item in doneItems" :key="item.id"> 
                      <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.email}}</p>
                        <p class="card-text">organization : {{ item.organization}}</p>
                        <p class="card-text">{{ item.update}}</p>
                        <a href="#" class="btn btn-danger btn-sm" v-on:click="deleteTask(item.id)">Delete</a>
                        </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
export default {
    name: "Done",
    props: ['doneItems'],
    methods: {
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }

}
</script>

<style>

</style>