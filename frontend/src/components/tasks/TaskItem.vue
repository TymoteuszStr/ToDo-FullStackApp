<template>
  <div class="task" ref="taskRef">
    <div class="task__general">
      <p class="task__general__title">{{ task.description }}</p>
      <div class="task__general__arrow" ref="arrowRef" @click.stop="showDetalis">
        <inline-svg class="task__general__arrow--svg" :src="require(`@/${arrowDown}`)" />
      </div>
    </div>
    <div class="task__details" v-show="detailToggler"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Task from "../../models/taskModel";
import InlineSvg from "vue-inline-svg";

type TaskProps = {
  task: Task;
};

export default defineComponent({
  name: "Tasks",
  components: { InlineSvg },
  props: {
    task: Object as () => TaskProps,
  },
  setup() {
    const taskRef = ref();
    const arrowRef = ref();
    const arrowDown = `assets/icons/arrow-down.svg`;
    let detailToggler = ref(false);
    const showDetalis = () => {
      taskRef.value.classList.toggle("showDetails");
      arrowRef.value.classList.toggle("rotateArrow");
      detailToggler.value = !detailToggler.value;
    };
    return { arrowDown, showDetalis, taskRef, arrowRef, detailToggler };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";
.task {
  color: $font-color;
  position: relative;
  width: 80%;
  height: 50px;
  border-radius: 9px;
  margin: 9px 0px;
  background: rgba(255, 255, 255, 0.08);
  transition: height ease-out 0.3s;
  &__general {
    @include flex-center;
    width: 100%;
    align-content: stretch;

    &__title {
      text-align: start;
      text-overflow: ellipsis;
      overflow: hidden;
      max-height: 2em;
      word-break: break-word;
      width: 100%;
      padding: 0 0 0 15px;
    }
    &__arrow {
      @include flex-center;
      width: 50px;
      height: 50px;
      transition: transform 0.3s;

      &--svg {
        width: 15px;
        height: 15px;
      }
    }
  }
  &__details {
    height: calc(180px - 2em);
  }
}
.showDetails {
  height: 180px;
}
.rotateArrow {
  transform: rotate(-180deg);
}
</style>
