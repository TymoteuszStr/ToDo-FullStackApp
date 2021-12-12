<template>
  <div class="details">
    <separator>Szczegóły</separator>
    <div class="text-container" @click.stop="descriptionClickHandle">
      <textarea
        v-if="editMode"
        class="details__input"
        type="text"
        v-model="inputText"
        ref="textInputRef"
        @keydown="keydownHandle"
      />
      <p v-else class="details__description">{{ inputText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, PropType, ref } from "vue";
import separator from "./separator.vue";

export default defineComponent({
  name: "TaskDetail",
  components: { separator },
  props: {
    description: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, { emit }) {
    const textInputRef = ref();
    const debounce = require("lodash.debounce");
    let inputText = ref(props.description as string);
    let editMode = ref(false);

    const emitWithDelay = debounce(() => {
      emit("editProperty", { description: inputText.value });
    }, 500);

    function descriptionClickHandle() {
      editMode.value = true;
      setTimeout(() => {
        textInputRef.value.focus();
      }, 0);
    }

    function turnOffEditMode() {
      editMode.value = false;
    }

    function keydownHandle(e: Event) {
      if (inputText.value.length > 200) e.preventDefault();
      emitWithDelay();
    }

    onMounted(() => {
      document.addEventListener("click", turnOffEditMode);
    });
    onUnmounted(() => {
      document.removeEventListener("click", turnOffEditMode);
    });

    return { inputText, descriptionClickHandle, editMode, textInputRef, keydownHandle };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.details {
  height: calc(180px - 2em);

  &__description {
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    width: 100%;
    word-break: break-word;
    padding: 5px 15px;
  }
  &__input {
    @extend .details__description;
    background: transparent;
    color: $font-color;
    border: none;
    height: inherit;
    resize: none;

    &:focus {
      @include edit-focuse-input;
    }
  }

  .text-container {
    width: 100%;
    height: inherit;
  }
}
</style>
