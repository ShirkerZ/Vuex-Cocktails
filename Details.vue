<template>
  <div class="details">
    <div class="details-container">
      <img class="main-image" :src="details.data.strDrinkThumb" alt="" />
      <div class="info">
        <div class="links">
          <router-link to="/">
            <p class="link-to-home">Home</p>
          </router-link>
          <p>/</p>
          <p>{{ details.data.strDrink }}</p>
        </div>

        <h1>{{ details.data.strDrink }}</h1>

        <div class="instructions">
          <h2>Instructions:</h2>
          <ul>
            <li
              v-for="(instruction, index) in details.data.strInstructions.split('.')"
              :key="index"
            >
              <span> {{ instruction }} </span>
            </li>
          </ul>
        </div>

        <div class="glass">
          <h2>Glass:</h2>
          <p>{{ details.data.strGlass }}</p>
        </div>
      </div>

      <div class="ingredients">
        <h2>Ingredients: ( {{ getIngredients.length }} )</h2>
        <div class="ingredients-container">
          <div
            class="ingredient"
            v-for="(ingredient, index) in getIngredients"
            :key="index"
          >
            <img
              :src="`http://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`"
              alt=""
            />
            <h3>{{ getMeasure[index] }} {{ ingredient }}</h3>
          </div>
        </div>
      </div>

      <div class="other">
        <Cocktails :inDetails="true" />
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Details",

  computed: {
    ...mapState(["details"]),
    ...mapGetters(["getIngredients", "getMeasure"]),
  },

  mounted() {
    this.$store.dispatch("fetchDetails", this.$route.params.id);
  },
};
</script>
