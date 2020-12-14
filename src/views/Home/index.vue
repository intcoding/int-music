<template>
  <div class="home"><banner /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './Banner.vue'

export default defineComponent({
  name: 'Home',
  components: { Banner },
})
</script>
<style lang="less" scoped></style>
