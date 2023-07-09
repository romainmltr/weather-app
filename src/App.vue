<template>
  <div id="app" class="text-text min-h-screen px-6 py-6 sm:px-12 md:px-36">
    <router-view />
  </div>
</template>

<style>
body {
  @apply bg-home bg-no-repeat bg-cover bg-center;
  background-image: url("@/assets/home.png");
  background-repeat: no-repeat;
  background-position: bottom;
}
</style>