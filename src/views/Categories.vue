<template>
  <div>
  <div class="page-title">
    <h3>Категории</h3>
  </div>
    <section>
      <div class="row">

        <CategoriesCreate @created="addCategory"/>

        <CategoriesEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesСreate.vue';
import CategoriesEdit from '@/components/CategoriesEdit.vue';

export default {
  name: 'categorries',
  data() {
    return {
      categories: [],
    };
  },

  methods: {
    addCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },

  components: {
    CategoriesCreate, CategoriesEdit,
  },

};
</script>
