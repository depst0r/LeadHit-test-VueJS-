<template>
  <div>
    <h1>Авторизация</h1>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title"></span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="SiteId"
            :class="{
              invalid:
                ($v.SiteId.$dirty && !$v.SiteId.required) ||
                ($v.SiteId.$dirty && !$v.SiteId.minLength) ||
                ($v.SiteId.$dirty && !$v.SiteId.maxLength),
            }"
          />
          <label for="email">Leadhit-Site-Id</label>
          <small
            class="helper-text invalid"
            v-if="$v.SiteId.$dirty && !$v.SiteId.required"
            >id сайта должен содержать 24 символа</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.SiteId.$dirty && !$v.SiteId.maxLength"
            >id сайта должен содержать "НЕ БОЛЕЕ"
            {{ $v.SiteId.$params.maxLength.max }} символов. Сейчас он
            {{ SiteId.length }}</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.SiteId.$dirty && !$v.SiteId.minLength"
            >id сайта должен содержать "НЕ МЕНЕЕ"
            {{ $v.SiteId.$params.minLength.min }} символов. Сейчас он
            {{ SiteId.length }}</small
          >
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
    SiteId: '',
    statusMessage: ''
  }),
  validations: {
    SiteId: { required, minLength: minLength(24), maxLength: maxLength(24) }
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
          'Leadhit-Site-Id': this.SiteId
        }
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('Leadhit-Site-Id', this.SiteId)
        }
      })
      if (this.SiteId === '5f8475902b0be670555f1bb3') {
        this.$router.push('/analytics')
      }
    }
  }
}
</script>
