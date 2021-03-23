<template>
<ul class="sidenav app-sidenav " :class="{open:value}">
    <router-link
    v-for="link in links"
    :key="link.url"
    active-class="active"
    tag="li"
    :exact="link.exact"
    :to="link.url"
    >
     <a href="#" class="waves-orange waves-teal pointer">{{ link.title }}</a>

    </router-link>
</ul>

</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      links: [
        { title: 'Счет', url: '/', exact: true },
        { title: 'История', url: '/history' },
        { title: 'Планирование', url: '/planning' },
        { title: 'Новая запись', url: '/record' },
        { title: 'Категории', url: '/categories' },
      ],
    };
  },

};
</script>
