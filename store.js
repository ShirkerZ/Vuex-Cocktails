import Vue from 'vue'
import Vuex from 'vuex'

//  STORE
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    searchText: "",
    details: {
      data: [],
      loaded: false,
      error: "",
    },
    cocktails: {
      data: [],
      loaded: false,
      error: "",
    },
  },

  getters: {
    getSearchText: state => {
      return state.searchText
    },

    totalNumberIngredients: state => {
      let totalNumberIngredients = 0
      state.cocktails.data.forEach((cocktail) => {
        for (let i = 1; i < 16; i++) {
          if (cocktail[`strIngredient${i}`] && cocktail[`strIngredient${i}`]) {
            totalNumberIngredients++
          } else {
            break;
          }
        }
      });

      return totalNumberIngredients;
    },

    totalDrinkImages: state => {
      let totalDrinkImages = 0
      state.cocktails.data.filter(cocktail => cocktail.strDrinkThumb != null && totalDrinkImages++)
      return totalDrinkImages;
    },

    getIngredients: state => {
      let ingredientsArray = [];
      for (let i = 1; i < 16; i++) {
        if (
          state.details.data[`strIngredient${[i]}`] != null &&
          state.details.data[`strIngredient${[i]}`] != undefined
        ) {
          ingredientsArray.push(state.details.data[`strIngredient${[i]}`]);
        } else {
          break;
        }
      }
      return ingredientsArray;
    },

    getMeasure: state => {
      let measureArray = [];
      for (let i = 1; i < 16; i++) {
        if (state.details.data[`strMeasure${i}`]) {
          measureArray.push(state.details.data[`strMeasure${i}`])
        } else {
          break;
        }
      }
      return measureArray
    }

  },

  mutations: {

    updateSearchText: (state, payload) => {
      state.searchText = payload
    },

    updateCocktails: (state, payload) => {
      state.cocktails.data = payload
    },

    updateError: (state, payload) => {
      if(payload === undefined){
        state.cocktails.error = true
      }else{
        state.cocktails.error = false
      }
    },

    updateLoaded: (state) => {
      state.cocktails.loaded = true
    },

    resetLoaded: (state) => {
      state.cocktails.loaded = false
    },

    updateDetails: (state, payload) => {
      state.details.data = payload
    }
  },

  actions: {
    fetchCocktails: (context) => {
      context.commit('resetLoaded')
      setTimeout(() => {
        fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${context.state.searchText}`
        )
          .then((res) => res.json())
          .then(data => context.commit('updateCocktails', data.drinks))
          .then(context.commit('updateLoaded'))
          //.then(data => context.commit('updateError', data))
          .catch((err) => console.log(err.message))
      }, 500)
    },

    fetchDetails: (context, payload) => {
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${payload}`
      )
        .then(res => res.json())
        .then(data => context.commit('updateDetails', data.drinks[0]))
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
    },
  },



});

