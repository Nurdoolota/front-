<template>
  <div>
    <div class="modalWindow-container">
      <div class="modalWindow">
        <div class="modalWindow__header">
          <div>{{ title }}</div>
          <form-button
            classButton="button__blue"
            label="Закрыть"
            @click="closeModalWindow"
          />
        </div>
        <div class="modalWindow__content">
          <slot name="default"></slot>
        </div>
        <div class="modalWindow__footer">
          <slot name="footer"></slot>
          <form-button
            classButton="button__blue"
            label="Отмена"
            @click="closeModalWindow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormButton from "./FormButton.vue";

export default {
  components: { FormButton },
  props: {
    course: {
      type: Object,
      required: false,
    },
    title: {
      type: String,
      default: "Модальное окно",
    },
  },
  methods: {
    closeModalWindow() {
      this.$emit("closeModalWindow");
    },
  },
};
</script>

<style scoped>
.modalWindow-container {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}
.modalWindow {
  padding: 15px;
  width: 300px;
  background: #fff;
  box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.modalWindow__header,
.modalWindow__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
