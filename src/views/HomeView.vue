<template>
  <div>
    <HeroHome @search="handleSearch" />
    <GetWeatherCityFutur :city="selectedCity" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HeroHome from '../components/HeroHome.vue';
import GetWeatherCityFutur from '../components/GetWeatherCityFutur.vue';

export default defineComponent({
  components: {
    HeroHome,
    GetWeatherCityFutur
  },
  setup() {
    const selectedCity = ref('Paris');

    const handleSearch = (city) => {
      selectedCity.value = city;
    };

    return {
      selectedCity,
      handleSearch
    };
  }
});
</script>
