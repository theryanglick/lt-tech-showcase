<template>
  <div class="hello">
    <input 
      type="text"
      v-model="inputText"
    />
    <button
      type="button"
      @click="fetchPhoto"
    >
      Get Photo
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import photoService from '../services/photoService.js';

export default {
  name: 'PhotoBrowser',
  props: {},
  setup() {
    const { getPhoto } = photoService();
    const inputText = ref('');

    async function fetchPhoto() {
      console.log(await getPhoto(inputText.value));
    }

    return {
      inputText,
      fetchPhoto,
    };

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
