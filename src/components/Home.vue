<template>
  <div class="container"><br>
    <h3 class="font-weight-light text-black">Manage tasks and workflows visually with Kanban Board!</h3>
    <ModalCreate v-on:addTask='addTask'></ModalCreate><br>
    <!-- Kanban Board -->
    <KanbanBoard 
    v-bind:backlogs="backlogs"
    v-on:deleteTask='deleteTask'
    v-on:editTask='editTask'
    v-on:todo='todo'
    v-bind:todos="todos"
    v-on:getDoing='getDoing'
    v-bind:doingItems="doingItems"
    v-on:getDone='getDone'
    v-bind:doneItems="doneItems"
    />
    <!-- -->
</template>

<script>
import ModalCreate from './ModalCreate'
import KanbanBoard from './KanbanBoard'

export default {
  name: "Home",
  props: ['backlogs', 'todos', 'doingItems', 'doneItems'],
  components: {
    ModalCreate,
    KanbanBoard
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