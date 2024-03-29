<template>
  <div class="general" id="toDoTaskGeneral">
    <div class="text-container" @click.stop="titleClickHandle">
      <input
        v-if="editMode"
        class="general__input"
        type="text"
        v-model="inputText"
        ref="textInputRef"
        @blur="onBlurHandle"
      />
      <p v-else class="general__title">{{ title }}</p>
    </div>
    <div class="arrow" ref="arrowRef" @click.stop="arrowClickHandle">
      <inline-svg class="arrow__svg" :src="require(`@/${arrowDown}`)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, onUnmounted } from "vue";
import InlineSvg from "vue-inline-svg";

export default defineComponent({
  name: "TaskGeneral",
  components: { InlineSvg },
  props: {
    title: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { emit }) {
    const arrowRef = ref();
    const textInputRef = ref();
    const arrowDown = `assets/icons/arrow-down.svg`;
    let inputText = ref(props.title as string);
    let editMode = ref(false);

    function turnOffEditMode() {
      editMode.value = false;
      editMode.value = props.title ? false : true;
    }
    function arrowClickHandle() {
      emit("arrowClick");
      arrowRef.value.classList.toggle("arrow--rotateUp");
    }

    function titleClickHandle() {
      editMode.value = true;
      setTimeout(() => {
        textInputRef.value.focus();
      }, 0);
    }

    function onBlurHandle(e: Event) {
      if (inputText.value.length > 30) e.preventDefault();
      emit("editProperty", { title: inputText.value });
    }

    onMounted(() => {
      document.addEventListener("click", turnOffEditMode);
    });
    onUnmounted(() => {
      document.removeEventListener("click", turnOffEditMode);
    });

    return {
      arrowDown,
      arrowClickHandle,
      arrowRef,
      inputText,
      titleClickHandle,
      editMode,
      textInputRef,
      onBlurHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.general {
  @include flex-center;
  height: $task-general-height;
  width: 100%;
  align-content: stretch;

  &__title {
    display: flex;
    align-items: center;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    width: 100%;
    padding: 0 0 0 15px;
    font-size: 16px;
    height: inherit;
  }
  &__input {
    @extend .general__title;
    color: $font-color;
    background: transparent;
    border: none;
    height: inherit;
    &:focus {
      @include edit-focuse-input;
    }
  }

  .text-container {
    @include flex-center;
    width: 100%;
    height: inherit;
  }

  .arrow {
    @include flex-center;
    width: 50px;
    height: inherit;
    transition: transform 0.3s;
    &__svg {
      @include flex-center;
      width: 15px;
      height: 15px;
    }
    &--rotateUp {
      transform: rotate(-180deg);
    }
  }
}
</style>
