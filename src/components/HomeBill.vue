<template>
<div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p class="currency-line" v-for="car in currency" :key="car">
            <span>{{ getCurrency(car) | currency(car) }}  </span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['rates'],

  data() {
    return {
      currency: ['RUB', 'USD', 'EUR'],
      bill: null,
    };
  },

  computed: {
    base() {
      return this.bill / (this.rates.RUB / this.rates.EUR);
    },
  },

  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },

  async mounted() {
    this.bill = this.$store.getters.info.bill;
  },
};
</script>
