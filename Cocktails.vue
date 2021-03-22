<template>
  <div class="cocktails" ref="cocktails">
    <div v-if="cocktails.loaded === false">
      <transition-group class="cocktails-container" name="skeleton">
        <div
          class="cocktail"
          v-for="(skeleton, index) in skeletonCards"
          :key="index"
        >
          <div class="skeleton-img"></div>
          <div class="skeleton-line"></div>
        </div>
      </transition-group>
    </div>

    <div v-else-if="cocktails.data === null || cocktails.data === undefined">
      <p>Nessun cocktail trovato...</p>
    </div>

    <div v-else>
      <transition-group
        @enter="fadeInCocktails"
        @leave="fadeOutCocktails"
        class="cocktails-container"
        name="list"
      >
        <div
          v-for="(cocktail, index) in cocktails.data"
          :key="`${cocktail.idDrink}-${index}`"
          class="cocktail"
          ref="cocktail"
          :data-index="index"
          :class="{ in_details: inDetails, load_less: loadLess }"
        >
          <router-link v-if="inDetails" :to="`./${cocktail.idDrink}`">
            <div class="dark-background">
              <h2>{{ cocktail.strDrink }}</h2>
            </div>
            <img :src="cocktail.strDrinkThumb" alt="" />
            <h3>{{ cocktail.strDrink }}</h3>
          </router-link>

          <router-link v-else :to="`./details/${cocktail.idDrink}`">
            <div class="dark-background">
              <h2>{{ cocktail.strDrink }}</h2>
            </div>
            <img :src="cocktail.strDrinkThumb" alt="" />
            <h3>{{ cocktail.strDrink }}</h3>
          </router-link>
        </div>
      </transition-group>
      <button
        @click="loadMoreDrinks"
        class="load-more"
        :class="{ button_in_details: inDetails, hide_button: hideButton }"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { gsap } from "gsap";

export default {
  name: "Cocktails",

  data() {
    return {
      loadLess: true,
      hideButton: false,
      skeletonCards: 3,
    };
  },

  props: {
    inDetails: Boolean,
  },

  methods: {
    loadMoreDrinks() {
      this.loadLess = false;
      this.hideButton = true;
    },

    fadeInCocktails: function (el, done) {
      let delay = el.dataset.index * 100;
      setTimeout(() => {
        gsap.from(el, {
          duration: 0.5,
          opacity: 0,
          yPercent: 200,
          onComplete: done,
        });
      }, delay);
    },

    fadeOutCocktails: function (el, done) {
      gsap.to(el, {
        duration: 0.3,
        opacity: 0,
        onComplete: done,
      });
    },
  },

  computed: {
    ...mapState(["cocktails"]),
  },

  mounted() {
    this.$store.dispatch("fetchCocktails");
  },
};
</script>

<style scoped>
.cocktail-enter-active,
.cocktail-leave-active {
  transition: opacity 5s;
}
.cocktail-enter,
.cocktail-leave-to {
  opacity: 0;
}

.list-move {
  transition: transform 0.5s;
}
</style>
