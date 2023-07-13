<template>
  <div class="form-wrapper">
    <div class="form-conteiner">
      <div class="form-input__active">
        <div class="form-input__title">
          <h3>Добро пожаловать!</h3>
          <p>Введите свои данные для входа в аккаунт</p>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent class="form" method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataReg.name"
                label="Имя пользователя"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required|email"
              v-slot="{ errors }"
            >
              <form-input v-model.trim="dataReg.email" label="Email" />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required|min:7"
              vid="confirmation"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataReg.password"
                label="Пароль"
                type="password"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required|confirmed:confirmation"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="confirmPassword"
                label="Повторите пароль"
                type="password"
              />
              <span class="form__error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <form-button
              @click="handleSubmit(register)"
              label="Зарегистрироваться"
              classButton="btn__blue-white button__auth"
            />
            <p v-if="error" class="form__error-message">{{ error }}</p>
          </form>
        </ValidationObserver>
      </div>
      <div class="form-input">
        <h3>Уже есть аккаунт?</h3>
        <p>Введите свои данные для входа в аккаунт</p>
        <form-button
          @click="$router.push({ name: 'authorization' })"
          label="Войти"
          classButton="btn__white"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/validators/validation-rules";
import FormInput from "@/components/FormInput.vue";
import FormButton from "@/components/FormButton.vue";
import mixAuth from "@/mixins/mixAuth";

export default {
  name: "RegistrationPage",
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
  mixins: [mixAuth],
  data() {
    return {
      dataReg: {
        name: "",
        email: "",
        password: "",
      },
      confirmPassword: "",
      error: null,
    };
  },
  methods: {},
};
</script>

<style>
.form__validator {
  text-align: center;
}
</style>
