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
      <div class="menu-item"><player /></div>
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
import Player from './Player.vue'

export default defineComponent({
  components: { Icon, Player },
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
    padding-bottom: 220px;
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
    z-index: 9999;

    .menu-item {
      color: fade(@primary-color, 30);
      font-size: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.active {
        color: @primary-color;
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
