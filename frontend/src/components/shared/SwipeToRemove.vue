<template>
  <div
    class="swiper"
    ref="swiperToRemove"
    :style="`left: ${position}px; opacity:${1.5 + position / 100}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "SwipeToRemove",

  setup(props, { emit }) {
    const swiperToRemove = ref();
    let position = ref(0);
    let touchStart = 0;
    let leftPos = 0;

    const handleTouchMove = (evt: TouchEvent) => {
      const move = evt.touches[0].clientX - touchStart;
      if ((leftPos <= -100 && move > 0) || leftPos + move > 36) return;
      else {
        position.value = leftPos + move;
      }
    };
    const handleTouchStart = (evt: any) => {
      leftPos = evt.target.offsetLeft;
      touchStart = evt.touches[0].clientX;
    };
    const handleTouchEnd = () => {
      if ((position.value < 0 && position.value > -100) || position.value >= 0) {
        position.value = 0;
      } else {
        emit("swipeLeft");
      }
    };

    onMounted(() => {
      swiperToRemove.value.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      swiperToRemove.value.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      swiperToRemove.value.addEventListener("touchend", handleTouchEnd, {
        passive: true,
      });
    });

    return { swiperToRemove, position };
  },
});
</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
}
</style>
