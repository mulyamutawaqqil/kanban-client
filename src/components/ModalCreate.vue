<template>
<div>
 <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form v-on:submit.prevent="addTask">
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="inputBacklog">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                    <button type="submit" class="btn btn-primary" >Add Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <button class="btn btn-success" @click="showModal = true">Add Task</button>
</div>
</template>

<script>
export default {
  name: "ModalCreate",
  data() {
    return {
      showModal: false,
      inputBacklog: ''
    }
  },
  methods: {
    addTask() {
      let task = this.inputBacklog
      this.$emit('addTask', task);
      this.inputBacklog = ''
      this.showModal = false
    }
  }
}
  
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>