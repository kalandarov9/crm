<template>

  <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
    <section>
       <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoriesCreate @created="addCategory" />
        <CategoriesEdit
          :categories="categories"
          @updateCategories="updateCategories"
          :key="categories.length + update"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesСreate.vue';
import CategoriesEdit from '@/components/CategoriesEdit.vue';

export default {
  name: 'categories',
  data() {
    return {
      categories: [],
      loading: true,
      update: 0,
    };
  },

  methods: {
    addCategory(category) {
      this.categories.push(category);
    },

    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].name = category.name;
      this.categories[idx].minValue = category.minValue;
      this.update += 1;
    },

    async getListsCategory() {
      this.loading = true;
      this.categories = await this.$store.dispatch('getListsCategory');
      this.loading = false;
    },
  },

  components: {
    CategoriesCreate, CategoriesEdit,
  },

  async mounted() {
    return this.getListsCategory();
  },

};
</script>
