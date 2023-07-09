<template>
  <div>
    <div v-if="data">
      <div class="carousel-container justify-center  mt-5 ">
        <div v-for="forecastDay in data.forecast.forecastday" :key="forecastDay.date" class=" flex space-between flex-col carousel-item">
          <h3 class="font-medium">{{ forecastDay.date.slice(8) }}</h3>
          <p class="mb-2">{{ forecastDay.day.avgtemp_c }}°C</p>
          <p class="mb-2">{{ forecastDay.day.daily_chance_of_rain }}%</p>

          <img :src="getWeatherIconUrl(forecastDay.day.condition.code)" alt="Weather Icon" class= " weather-icon">
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import WeatherService from '../services/weatherService.js';

export default {
  props: {
    city: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: null
    };
  },
  watch: {
    city: {
      immediate: true,
      handler(newCity) {
        this.getWeatherForecast(newCity);
      }
    }
  },
  methods: {
    async getWeatherForecast(city) {
      try {
        const response = await WeatherService.getForecastByCity(city, 3);
        this.data = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    getWeatherIconUrl(code) {
      return require(`@/assets/weather-icons/${code}.png`);
    },
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  display: flex;
  gap: 1rem;

}

.carousel-item {
  overflow-x: hidden;
  width: 100%;
  padding: 1rem;
  position: relative;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba( 255, 255, 255, 0.7 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  transition: background-color 0.2s, transform 0.3s;
}

.weather-icon {
  width: auto;
  height: auto;
  max-width: 100px;
}
</style>
