<template>
  <header>
    <icon
      @click="$router.go(-1)"
      type="back"
      :style="{ visibility: back ? 'visible' : 'hidden' }"
    />
    <div class="title">
      <slot></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  components: { Icon },
  props: {
    back: {
      type: Boolean,
      default: () => false,
    },
  },
})
</script>

<style lang="less" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 112px;
  padding: 0 32px;
  color: #333333;

  .icon {
    font-size: 32px;
  }

  .title {
    font-size: 32px;
    text-align: center;
  }
}
</style>
