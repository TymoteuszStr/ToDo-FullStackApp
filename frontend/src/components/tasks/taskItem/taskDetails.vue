<template>
  <div class="details">
    <separator>Szczegóły</separator>
    <div class="text-container" @click.stop="descriptionClickHandle">
      <textarea v-if="editMode" class="details__input" type="text" v-model="inputText" ref="textInputRef" @keydown="inputValidation" />
      <p v-else class="details__description">{{ inputText }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
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
  setup(props) {
    let inputText = ref(props.description as string);
    let editMode = ref(false);
    const textInputRef = ref();

    const descriptionClickHandle = () => {
      editMode.value = true;
      setTimeout(() => {
        textInputRef.value.focus();
      }, 0);
    };
    document.addEventListener("click", () => {
      editMode.value = false;
      //add saveing task
    });
    const inputValidation = (e: Event) => {
      if (inputText.value.length > 200) e.preventDefault();
    };
    return { inputText, descriptionClickHandle, editMode, textInputRef, inputValidation };
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
      outline: 2px solid rgba(255, 255, 255, 0.3);
    }
  }

  .text-container {
    width: 100%;
    height: inherit;
  }
}
</style>
