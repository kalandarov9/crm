<template>
  <div>

    <Loader v-if="loading" />

  <div v-if="record">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">История</router-link>
      <a @click.prevent class="breadcrumb" >
        {{ record.type === 'income' ? 'Доход' : 'Расход'}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card"
         :class="[record.class]"
         >
          <div class="card-content">
            <p>Описание: {{record.description}}</p>
            <p>Сумма: {{record.amount}}</p>
            <p>Категория: {{record.nameCat}}</p>

            <small> {{ $moment(record.date).locale('ru').format('MM-DD-YYYY hh:mm:ss') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>Такой записи нет</div>
</div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      record: null,
      categories: [],
      loading: true,
    };
  },
  async mounted() {
    const idRecord = this.$route.params.id;
    this.loading = false;
    const record = await this.$store.dispatch('getListRecordById', idRecord);
    const categories = await this.$store.dispatch('getListsCategoryById', record.categoryId);
    this.record = {
      ...record,
      nameCat: categories.name,
    };
  },
};
</script>
