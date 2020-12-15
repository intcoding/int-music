<template>
  <div class="header">
    <div class="left">
      <h1>音乐馆</h1>
    </div>
    <div class="right">
      <input placeholder="搜索..." />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="less" scoped>
@import '@/style/vars.less';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  h1 {
    font-size: 40px;
    color: @text-primary;
  }

  input {
    border: 0;
    outline: none;
    background: #eeeeee;
    width: 300px;
    height: 56px;
    padding: 0 24px;
    border-radius: 24px;
  }
}
</style>
