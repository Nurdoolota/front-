<template>
  <div class="form-wrapper">
    <div class="form-conteiner">
      <div class="form-input__active">
        <div class="form-input__title">
          <h3>Добро пожаловать!</h3>
          <p>Введите свои данные для входа в аккаунт</p>
        </div>
        <ValidationObserver ref="observer">
          <form @submit.prevent class="form" method="post">
            <ValidationProvider
              class="form__validator"
              rules="required"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataReg.name"
                placeholderInput="Имя пользователя"
              />
              <span>{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form__validator"
              rules="required|email"
              v-slot="{ errors }"
            >
              <form-input
                v-model.trim="dataReg.email"
                placeholderInput="Email"
              />
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
                placeholderInput="Пароль"
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
                placeholderInput="Повторите пароль"
                type="password"
              />
              <span class="form__error-message">{{ errors[0] }}</span>
            </ValidationProvider>
            <form-button
              @click="validate"
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
import { mapActions } from "vuex";

export default {
  name: "RegistrationPage",
  components: { ValidationProvider, ValidationObserver, FormInput, FormButton },
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
  methods: {
    ...mapActions("mAuth", ["login"]),
    async validate() {
      const success = await this.$refs.observer.validate();
      if (success) {
        await this.register(this.dataReg);
      }
    },
  },
};
</script>

<style>
.form__validator {
  text-align: center;
}
</style>
