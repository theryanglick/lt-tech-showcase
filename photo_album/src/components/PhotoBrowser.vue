<template>
  <div class="hello">
    <p>Enter a number and click Get Photo</p>
    <input 
      type="text"
      v-model="inputText"
      data-test="photoNumber"
    />
    <button
      type="button"
      @click.prevent="fetchPhoto"
      data-test="button"
    >
      Get Photo
    </button>
  </div>
  <div
    v-if="isRetrievingData"
    class="photo-container"
  >
    Searching...
  </div>
  <div
    class="photo-container"
    v-if="successfulResponse && !isRetrievingData"
    v-for="(photo, index) in photos"
    :key="photo.id"
    data-test="photo"
  >
    <img
      :src="photo.thumbnailUrl"
      :title="photo.title"
      @click="photoClicked(photo)"
      alt="Image"
      @load="photoLoaded(index)"
      v-show="photo.isLoaded === true"
    >
    <div
      v-if="photo.isLoaded !== true"
    >
      Loading Image...
    </div>
    <p>{{ photo.title }}</p>
  </div>
  <div
    v-if="!successfulResponse && !isRetrievingData"
    class="photo-container"
  >
    No results matched your search
  </div>
  <PhotoModal
    :photo="selectedPhoto"
    v-if="selectedPhoto && selectedPhoto !== null"
  >
  </PhotoModal>
</template>

<script>
import { ref } from 'vue';
import PhotoModal from './PhotoModal.vue';
import photoService from '../services/photoService.js';
import eventBus from '../events/eventBus.js';

export default {
  name: 'PhotoBrowser',
  components: {
    PhotoModal,
  },
  props: {},
  beforeUnmount() {
    eventBus.$off('photoModal:close');
  },
  setup() {
    const { getPhoto } = photoService();
    const inputText = ref('');
    const photos = ref();
    const successfulResponse = ref(true);
    const isRetrievingData = ref(false);
    const selectedPhoto = ref(null);

    async function fetchPhoto() {
      // Retrieve photo object from service
      try {
        // Set flag to display searching message
        isRetrievingData.value = true;
        // Reset the selected photo variable
        selectedPhoto.value = null;
        // Call API
        const serviceResponse = await getPhoto(inputText.value);
        // Check API response
        if (serviceResponse && serviceResponse.data && serviceResponse.data.length > 0) {
          photos.value = serviceResponse.data;
          successfulResponse.value = true;
        } else {
          successfulResponse.value = false;
        }
        isRetrievingData.value = false;
      } catch (error) {
        // Log error here
        isRetrievingData.value = false;
        successfulResponse.value = false;
      }
    }

    async function photoClicked(photoObject) {
      // Set the selected photo value based on what was clicked
      selectedPhoto.value = photoObject;
    }

    async function photoLoaded(index) {
      // Set the isLoaded value to stop showing the loading image message
      photos.value[index]['isLoaded'] = true;
    }

    // Event handler to close the modal
    eventBus.$on('photoModal:close', () => {
      selectedPhoto.value = null;
    });

    return {
      inputText,
      photos,
      fetchPhoto,
      successfulResponse,
      isRetrievingData,
      photoClicked,
      selectedPhoto,
      photoLoaded,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello p {
  font-weight: 700;
}
</style>
