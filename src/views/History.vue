<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!items.length">
      Нет записей.
      <router-link to="/record"> Cоздать </router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'">
      >
      </Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/pagination.mixins';

export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      categories: [],
      loading: true,
    };
  },

  methods: {
  },

  async mounted() {
    this.categories = await this.$store.dispatch('getListsCategory');
    const records = await this.$store.dispatch('getListRecord');
    if (records.length) {
      this.setupPagination(records.map((rec) => {
        const cat = this.categories.find((r) => r.id === rec.id).name;
        return {
          ...rec,
          categorieName: cat,
          typeClass: rec.type === 'income' ? 'green' : 'red',
          typeText: rec.type === 'income' ? 'Приход' : 'Расход',
        };
      }));
    }
    this.loading = false;
  },

  components: {
    HistoryTable,
  },
};
</script>
