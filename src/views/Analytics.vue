<template>
  <div class="about">
    <h1>This is an about page</h1>
    <section>
      {{info}}
    </section>
  </div>
</template>

<script>

export default {
  name: 'analytics',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    fetch('http://localhost:3030/visits')
      .then(res => res.json())
      .then(res => (this.info = res))
  }
}
</script>
