<template>
  <div class="w-full flex mt-3 mb-3 flex-row w-full items-center justify-between">
    <input type="text" v-model="city" placeholder="Enter city" class="w-2/4 bg-blue-200  text-black placeholder-black rounded border-1.5 border-black h-9 outline-none roboto transition-all">
    <button class="bg-blue-900 font-bold text-white p-2.5 rounded hover:bg-blue-300" @click="searchWeather">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: ''
    };
  },
  methods: {
    searchWeather() {
      this.$emit('search', this.city);
    }
  }
};
</script>
