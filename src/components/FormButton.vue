<template>
  <div>
    <button :class="classButton" @click="click">{{ label }}</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    courseId: {
      type: Number,
      required: false,
    },
    classButton: {
      type: String,
      default: "",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
button {
  background-color: black;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 100px;
  color: white;
  min-width: 175px;
  height: 50px;
  text-align: center;
  padding: 13px 60px 13px 60px;
}
.btn__white {
  border: 1px solid white;
}
.btn__blue-white {
  background-color: #4640de;
}

.button__blue {
  border: 1px solid #4640de;
  color: #4640de;
}
</style>
