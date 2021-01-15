<template>
    <div class="col-md-3">
          <div class="card bg-light">
              <div class="card-body">
                  <h6 class="card-title text-uppercase text-truncate py-2">Todo</h6>
                  <div class="items border border-dark" v-for="todo in todos" :key="todo.id"> 
                      <div class="card-body">
                        <h5 class="card-title">{{ todo.name }}</h5>
                        <p class="card-text">{{ todo.email}}</p>
                        <p class="card-text">organization : {{ todo.organization}}</p>
                        <p class="card-text">{{ todo.update}}</p>
                        <ModalEdit v-bind:id="todo.id" v-on:editTask='editTask'></ModalEdit>
                        <a href="#" class="btn btn-danger btn-sm" v-on:click="deleteTask(todo.id)">Delete</a>
                        <a href="#" class="btn btn-success btn-sm" v-on:click="getDoing(todo.id)">Doing</a>
                        </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
import ModalEdit from './ModalEdit'

export default {
    name: "Todo",
    props: ["todos"],
    methods: {
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        editTask({task, id}) {
        this.$emit('editTask', ({task, id}))
        },
        getDoing(id) {
            this.$emit('getDoing', id)
        }
    },
    components: {
        ModalEdit
    }

}
</script>

<style>

</style>