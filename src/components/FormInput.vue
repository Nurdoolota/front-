<template>
  <div>
    <div class="text-field text-field_floating">
      <input
        class="text-field__input"
        :value="value"
        @input="input"
        :type="type"
        :placeholder="placeholderInput"
      />
    </div>
    <label class="text-field__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholderInput: {
      type: String,
      default: "",
    },
  },
  methods: {
    input(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-field {
  margin-bottom: 1rem;
}

.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
  color: #212529;
}

.text-field__input {
  display: block;
  width: 360px;
  height: 50px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  padding: 0.375rem 0.75rem;
  /* margin: 10px; */
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 100px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* .text-field__input[type="search"]::-webkit-search-decoration,
.text-field__input[type="search"]::-webkit-search-cancel-button,
.text-field__input[type="search"]::-webkit-search-results-button,
.text-field__input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
} */

.text-field__input::placeholder {
  color: #212529;
  opacity: 0.4;
}

.text-field__input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 1px 1px 100px 0px #00000014;
}

.text-field__input:disabled,
.text-field__input[readonly] {
  background-color: #f5f5f5;
  opacity: 1;
}

/* with floating label */
.text-field_floating {
  position: relative;
}

.text-field_floating .text-field__input {
  height: calc(3.5rem + 2px);
  line-height: 1.25;
  padding: 1rem 0.75rem;
}

.text-field_floating .text-field__label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
}

.text-field_floating .text-field__input::-moz-placeholder {
  color: transparent;
}

.text-field_floating .text-field__input::placeholder {
  color: transparent;
}

.text-field_floating .text-field__input:focus,
.text-field_floating .text-field__input:not(:placeholder-shown) {
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}

.text-field_floating .text-field__input:focus ~ .text-field__label,
.text-field_floating
  .text-field__input:not(:placeholder-shown)
  ~ .text-field__label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.75rem) translateX(0.15rem);
}

.form__input {
  font-size: 14px;
  width: 360px;
  height: 50px;
  border-radius: 100px;
  /* margin: 10px; */
  height: calc(2.25rem + 2px);
}
</style>
