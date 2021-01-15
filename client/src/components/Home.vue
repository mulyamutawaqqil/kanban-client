<template>
  <div class="container"><br>
    <h3 class="font-weight-light text-black">Manage tasks and workflows visually with Kanban Board!</h3>
    <ModalCreate v-on:addTask='addTask'></ModalCreate><br>
    <!-- Kanban Board -->
    <div class="row" id="kanban">
      <!-- backlog -->
        <Backlog v-bind:backlogs="backlogs"
        v-on:deleteTask='deleteTask'
        v-on:editTask='editTask'
        v-on:todo='todo'
        ></Backlog>
        <!-- -->
        <!-- Todo -->
        <Todo v-bind:todos="todos"
        v-on:deleteTask='deleteTask'
        v-on:editTask='editTask'
        v-on:getDoing='getDoing'
        ></Todo>
        <!-- -->
        <!-- Doing -->
        <Doing v-bind:doingItems="doingItems"
        v-on:deleteTask='deleteTask'
        v-on:editTask='editTask'
        v-on:getDone='getDone'
        ></Doing>
        <!-- -->
        <!-- Done -->
        <Done v-bind:doneItems="doneItems"
        v-on:deleteTask='deleteTask'></Done>
        <!-- -->
      </div>
    </div>
    <!-- -->
</template>

<script>
import ModalCreate from './ModalCreate'
import Backlog from './Backlog'
import Todo from './Todo'
import Doing from './Doing'
import Done from './Done'

export default {
  name: "Home",
  props: ['backlogs', 'todos', 'doingItems', 'doneItems'],
  components: {
    ModalCreate,
    Backlog,
    Todo,
    Doing,
    Done
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
    },
    getDoing(id) {
      this.$emit('getDoing', id)
    },
    getDone(id) {
      this.$emit('getDone', id)
    },
    addTask(task) {
      this.$emit('addTask', task);
    }
  }
}
</script>

<style>

</style>