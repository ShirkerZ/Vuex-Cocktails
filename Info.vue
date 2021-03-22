<template>
  <div class="info">
    <ul v-if="cocktails.data">
      <li>Total Drink: ( {{ cocktails.data.length }} )</li>
      |
      <li>Total Ingredients: ( {{ totalNumberIngredients }} )</li>
      |
      <li>Drink Images: ( {{ totalDrinkImages }} )</li>
    </ul>

    <ul v-else>
      <li>Total Drink: ( 0 )</li>
      |
      <li>Total Ingredients: ( 0 )</li>
      |
      <li>Drink Images: ( 0 )</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Info",

  computed: {
    ...mapState(["cocktails", "drinkImagesCounter"]),
    ...mapGetters(["totalNumberIngredients", "totalDrinkImages"]),
  },
};
</script>