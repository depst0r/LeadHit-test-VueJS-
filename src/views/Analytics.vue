<template>
  <div class="stats-wrapper">
   <h1>Аналитика</h1>
    <chart :chart-data="datacollection" style="width: 700px; margin: auto"></chart>
  </div>
</template>

<script>
import Chart from '../components/Chart'

export default {
  components: {
    Chart
  },
  data () {
    return {
      datacollection: {},
      analitycs: []
    }
  },
  async mounted () {
    const res = await fetch('http://localhost:3030/visits')
    const analytics = await res.json()
    this.analytics = analytics
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: this.analytics.map(res => res.date),
        datasets: [
          {
            label: 'Аналитика по визитам',
            borderColor: 'MediumSlateBlue',
            pointBackgroundColor: 'Aqua',
            pointBorderColor: 'Aquamarine',
            backgroundColor: 'SkyBlue',
            data: this.analytics.map(res => res.visits)
          }
        ]
      }
    }
  }
}
</script>
