<template>
  <div class="banners">
    <swiper
      :pagination="{ clickable: false }"
      :autoplay="{
        delay: 5000,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="banner in banners" :key="banner.bannerId">
        <img :src="banner.pic" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import 'swiper/swiper.less'
import 'swiper/components/navigation/navigation.less'
import 'swiper/components/pagination/pagination.less'

import { http } from '@/utils'

SwiperCore.use([Pagination, Autoplay])

interface Banner {
  pic: string
  bannerId: string
}

export default defineComponent({
  setup() {
    const banners = ref<Banner[]>([])

    onMounted(async () => {
      const res = await http.get('/banner', {
        params: { type: 1 },
      })
      banners.value = res.data.banners
    })

    return {
      banners,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },
  },
})
</script>

<style lang="less" scoped>
.banners {
  border-radius: 24px;
  overflow: hidden;

  .swiper-slide {
    width: 100%;
    height: 272px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="less">
.banners {
  .swiper-pagination {
    text-align: right;

    .swiper-pagination-bullet {
      background: fade(#ffffff, 40);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-bottom: 8px;

      &:last-child {
        margin-right: 24px;
      }
    }
    .swiper-pagination-bullet {
      background: #ffffff;
      transform: scale(1.05);
    }
  }
}
</style>
