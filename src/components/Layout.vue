<template>
  <div class="layout">
    <div class="header"><slot name="header"></slot></div>
    <div class="content"><slot></slot></div>
    <div class="bottom">
      <div
        class="menu-item"
        :class="{ active: active === 'home' }"
        @click="$router.push('/')"
      >
        <icon type="home" />
        <p>音乐馆</p>
      </div>

      <div class="menu-item">
        <div class="music-info"></div>
      </div>

      <div
        class="menu-item"
        :class="{ active: active === 'me' }"
        @click="$router.push('/me')"
      >
        <icon type="me" />
        <p>我的</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  components: { Icon },
  computed: {
    active() {
      switch (this.$route.path) {
        case '/':
          return 'home'
        case '/recommend':
          return 'recommend'
        case '/found':
          return 'found'
        case '/me':
          return 'me'
        default:
          return undefined
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/style/vars.less';

.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 32px;
    padding-bottom: 160px;
  }

  .bottom {
    width: 100%;
    height: 140px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 20px 20px #111111;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 20px 60px;
    position: fixed;
    bottom: 0;

    .music-info {
      width: 100px;
      height: 100px;
      background: @primary-color;
      border-radius: 50%;
    }

    .menu-item {
      color: fade(@primary-color, 30);
      font-size: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: scale(0.95);

      &.active {
        color: @primary-color;
        transform: scale(1);
        transition: all 0.3s ease-in-out;
      }

      .icon {
        font-size: 50px;
        margin-bottom: 4px;
      }
    }
  }
}
</style>
