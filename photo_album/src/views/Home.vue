<template>
  <div class="home">
    <PhotoBrowser></PhotoBrowser>
  </div>
</template>

<script>
import PhotoBrowser from '@/components/PhotoBrowser.vue'

export default {
  name: 'Home',
  components: {
    PhotoBrowser,
  },
}
</script>

<style scoped>
.home {
  padding-top: 25px;
}
</style>
