<template>
<div class="row" id="kanban">
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
</div>
</template>

<script>
import ModalEdit from './ModalEdit'
export default {
  name: "KanbanBoard",
  components: {
    ModalEdit
  },
  props: ['backlogs', 'todos', 'doingItems', 'doneItems'],
  methods: {
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    editTask({task, id}) {
      this.$emit('editTask', ({task, id}))
    },
    todo(id) {
      this.$emit('todo', id)
    },
    getDoing(id) {
      this.$emit('getDoing', id)
    },
    getDone(id) {
      this.$emit('getDone', id)
    }
  }
}
</script>

<style>

</style>
