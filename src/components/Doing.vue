<template>
  <div class="col-md-3">
          <div class="card bg-light">
              <div class="card-body">
                  <h6 class="card-title text-uppercase text-truncate py-2">Doing</h6>
                  <div class="items border border-dark" v-for="item in doingItems" :key="item.id"> 
                      <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.email}}</p>
                        <p class="card-text">organization : {{ item.organization}}</p>
                        <p class="card-text">{{ item.update}}</p>
                        <ModalEdit v-bind:id="item.id" v-on:editTask='editTask'></ModalEdit>
                        <a href="#" class="btn btn-danger btn-sm" v-on:click="deleteTask(item.id)">Delete</a>
                        <a href="#" class="btn btn-success btn-sm" v-on:click="getDone(item.id)">Done</a>
                        </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
import ModalEdit from './ModalEdit'
export default {
    name: "Doing",
    props: ['doingItems'],
    methods: {
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        editTask({task, id}) {
        this.$emit('editTask', ({task, id}))
        },
        getDone(id) {
            this.$emit('getDone', id)
        }
    },
    components: {
        ModalEdit
    }

}
</script>

<style>

</style>