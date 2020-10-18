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
      >id сайта должен содержать "НЕ БОЛЕЕ"  {{$v.email.$params.maxLength.max}} символов. Сейчас он {{email.length}}</small>
                  <small class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.minLength"
      >id сайта должен содержать "НЕ МЕНЕЕ" {{$v.email.$params.minLength.min}} символов. Сейчас он {{email.length}}</small>
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
    email: '',
    statusMessage: ''
  }),
  validations: {
    email: { required, minLength: minLength(24), maxLength: maxLength(24) }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      fetch('https://track-api.leadhit.io/client/test_auth', {
        method: 'GET',
        headers: {
          'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
          'Leadhit-Site-Id': this.email
        }
      }).then(res => {
        if (res.status === 200) {
          localStorage.setItem('Leadhit-Site-Id', this.email)
        }
      })
      const formData = {
        email: this.email
      }
      console.log(formData)
      if (this.email === '5f8475902b0be670555f1bb3') {
        this.$router.push('/analytics')
      }
    }
  }
}
</script>
