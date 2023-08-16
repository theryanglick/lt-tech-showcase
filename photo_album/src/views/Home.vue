<template>
  <div class="home">
    <PhotoBrowser></PhotoBrowser>
  </div>
</template>

<script>
// @ is an alias to /src
import PhotoBrowser from '@/components/PhotoBrowser.vue'

export default {
  name: 'Home',
  components: {
    PhotoBrowser,
  },
}
</script>
