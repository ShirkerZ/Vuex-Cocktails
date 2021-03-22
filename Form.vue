<template>
  <div class="form">
    <form @submit.prevent="fetchCocktails">
      <i class="fas fa-search"></i>
      <input @input="updateText" placeholder="Search Cocktail" />
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Form",

  computed: {
    ...mapState(["searchText"]),
  },

  methods: {
    ...mapActions(["fetchCocktails"]),

    updateText(e) {
      this.$store.commit("updateSearchText", e.target.value);
    },
  },
};
</script>