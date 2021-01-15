<template>
  <div class="col-md-3">
            <div class="card bg-light">
                <div class="card-body">
                    <h6 class="card-title text-uppercase text-truncate py-2">Backlog</h6>
                    <div class="items border border-dark" v-for="backlog in backlogs" :key="backlog.id"> <!-- backlog-->
                        <div class="card-body">
                          <h5 class="card-title">{{ backlog.name }}</h5>
                          <p class="card-text">{{ backlog.email}}</p>
                          <p class="card-text">organization : {{ backlog.organization}}</p>
                          <p class="card-text">{{ backlog.update}}</p>
                          <ModalEdit v-bind:id="backlog.id" v-on:editTask='editTask'></ModalEdit>
                          <a href="#" class="btn btn-danger btn-sm" v-on:click="deleteTask(backlog.id)">Delete</a>
                          <a href="#" class="btn btn-success btn-sm" v-on:click="todo(backlog.id)">Todo</a>
                          </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import ModalEdit from './ModalEdit'

export default {
  name: "Backlog",
  components: {
    ModalEdit
  },
  props: ['backlogs'],
  data() {
    return {
      inputBacklog: ''
    }
  }, 
  methods: {
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    editTask({task, id}) {
      this.$emit('editTask', ({task, id}))
    },
    todo(id) {
      this.$emit('todo', id)
    }
  }
}
</script>

<style>

</style>