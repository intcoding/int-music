<template>
  <div class="home">
    <top-header />
    <banner />
    <div class="blocks">
      <div class="block-item">
        <div class="icon-box">
          <icon type="singer" />
        </div>

        <p>歌手</p>
      </div>
      <div class="block-item">
        <div class="icon-box">
          <icon type="ranking" />
        </div>
        <p>排行榜</p>
      </div>
      <div class="block-item">
        <div class="icon-box">
          <icon type="playlist" />
        </div>
        <p>歌单</p>
      </div>
      <div class="block-item">
        <div class="icon-box">
          <icon type="radio" />
        </div>
        <p>电台</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './Banner.vue'
import TopHeader from './TopHeader.vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  name: 'Home',
  components: { Banner, TopHeader, Icon },
})
</script>
<style lang="less" scoped>
@import '@/style/vars.less';

.blocks {
  display: flex;
  justify-content: space-around;
  padding: 32px 0;

  .block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon-box {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid fade(@primary-color, 20);
      display: flex;
      align-items: center;
      justify-content: center;
      background: fade(@primary-color, 5);
    }

    .icon {
      font-size: 56px;
      color: fade(@primary-color, 70);
    }

    p {
      font-size: 26px;
      margin-top: 16px;
    }
  }
}
</style>
