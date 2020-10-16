<template>
  <div>
  <h1>LeadHit</h1>
  <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title"></span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.minLength) || ($v.email.$dirty && !$v.email.maxLength)}"
      >
      <label for="email">Leadhit-Site-Id</label>
      <small class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >id сайта должен содержать 24 символа</small>
            <small class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.maxLength"
      >id сайта должен содержать "НЕ БОЛЬШЕ"  24 символов</small>
                  <small class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.minLength"
      >id сайта должен содержать "НЕ МЕНЬШЕ" 24 символов</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Войти
      </button>
    </div>
  </div>
</form>
</div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'login',
  data: () => ({
    email: ''
  }),
  validations: {
    email: { required, minLength: minLength(24), maxLength: maxLength(24) }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }
    }
  }
}
</script>
