<template>
  <div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader v-if="loading "/>

  <div v-else class="row">
    <HomeBill
    :rates="currency.rates"
    />
    <HomeCurrency
    :rates="currency.rates"
    :date2 = "currency.date"
    />
  </div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

@Component({
  components: {
    HomeBill, HomeCurrency,
  },
})
export default class Home extends Vue {
  name = 'home';

  loading = true;

  currency = null;

  async refresh() {
    this.loading = true;
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  }

  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    await this.$store.dispatch('fetchInfo');
    this.loading = false;
  }
}
</script>
