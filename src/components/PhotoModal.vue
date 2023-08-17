<template>
  <div class="modal-container">
    <div class="photo-container">
      <div class="close-button">
        <button @click="closeModal">Close</button>
      </div>
      <img
        :src="photo.url"
        :title="photo.title"
        alt="Image"
        @load="photoLoaded()"
        v-show="isPhotoLoaded === true"
      >
      <div
        v-if="isPhotoLoaded !== true"
      >
        Loading Image...
      </div>
      <p>{{ photo.title }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import eventBus from '../events/eventBus.js';

export default {
  name: 'PhotoModal',
  props: {
    photo: Object,
  },
  setup() {
    const isPhotoLoaded = ref(false);
    async function closeModal() {
      eventBus.$emit('photoModal:close');
    }
    async function photoLoaded() {
      isPhotoLoaded.value = true;
    }

    return {
      closeModal,
      photoLoaded,
      isPhotoLoaded,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  overflow-x: hidden;
  overflow-y: auto;
}
.close-button {
  margin-bottom: 1rem;
}
</style>
