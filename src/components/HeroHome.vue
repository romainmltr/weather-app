<template>
  <div>
    <SearchBar @search="handleSearch"></SearchBar>
    <div class="glass-container">
      <div v-if="weatherData" class="w-full flex-col items-start h-full weather-info">
        <h2 class="text-2xl font-semibold text-black mb-4">{{ weatherData.location.name }}</h2>
        <div class="weather-details  grid w-full grid-cols-1 sm:grid-cols-2 gap-4 items-start sm:w-full items-center mt-2">
          <p class=" h-12 w-full text-2xl text-black">
            <span class="font-bold">Humidity:</span> {{ weatherData.current.humidity }}%
            <span class="emoji-icon" v-html="getEmojiIcon('humidity')"></span>
          </p>
          <p class="text-2xl  w-full h-12 text-black">
            <span class="font-bold">Wind:</span> {{ weatherData.current.wind_kph }} km/h
            <span class="emoji-icon" v-html="getEmojiIcon('wind')"></span>
          </p>
          <p class="text-2xl  w-full h-12 text-black">
            <span class="font-bold">Precipitation:</span> {{ weatherData.current.precip_mm }} mm
            <span class="emoji-icon" v-html="getEmojiIcon('precipitation')"></span>
          </p>
          <p class="text-2xl w-full h-12 text-black">
            <span class="font-bold">Pressure:</span> {{ weatherData.current.pressure_mb }} mb
            <span class="emoji-icon" v-html="getEmojiIcon('pressure')"></span>
          </p>
          <p class="text-2xl  w-full h-12 text-black">
            <span class="font-bold">UV:</span> {{ weatherData.current.uv }}
            <span class="emoji-icon" v-html="getEmojiIcon('uv')"></span>
          </p>
          <p class="text-2xl  w-full h-12 text-black">
            <span class="font-bold">Visibility:</span> {{ weatherData.current.vis_km }} km
            <span class="emoji-icon" v-html="getEmojiIcon('visibility')"></span>
          </p>
        </div>
        <div class="weather-icon-container">
        <img :src="getWeatherIconUrl(weatherData.current.condition.code)" alt="Weather Icon" class=" items-center weather-icon">
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherService from '../services/weatherService.js';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      weatherData: null,
      city: 'Paris'
    };
  },
  mounted() {
    this.getWeatherByCity();
  },
  methods: {
    async getWeatherByCity() {
      try {
        const response = await WeatherService.getWeatherByCity(this.city);
        this.weatherData = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    getWeatherIconUrl(code) {
      return require(`@/assets/weather-icons/${code}.png`);
    },
    handleSearch(city) {
      this.city = city;
      this.getWeatherByCity();
      this.$emit('search', city);
    },
    getEmojiIcon(type) {
      let icon = '';
      switch (type) {
        case 'humidity':
          icon = '🌧️';
          break;
        case 'wind':
          icon = '🌬️';
          break;
        case 'precipitation':
          icon = '💦';
          break;
        case 'pressure':
          icon = '🌡️';
          break;
        case 'uv':
          icon = '☀️';
          break;
        default:
          icon = '';
      }
      return icon;
    }
  }
};
</script>

<style scoped>
.glass-container {
  position: relative;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba( 255, 255, 255, 0.25 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  transition: background-color 0.2s, transform 0.3s;
}

.glass-container:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}


.weather-details {
  width: 100%;
}

.emoji-icon {
  font-size: 1.5rem;
}

.weather-icon {
  margin-top: 2rem;
  max-width: 200px;
  @media (max-width: 640px) {
    max-width: 140px;
  }
}

.weather-icon-container {
  position: absolute;
  top: -20px;
  left: 95%;
  transform: translateX(-50%);
  z-index: 1;
  @media (max-width: 640px) {
    position: fixed;
    right: 0%;
    left: 75%;
    top: 0%;

  }
}

</style>
