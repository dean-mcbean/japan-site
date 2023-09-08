<template>
  <JourneyPage msg="Welcome to JAPAN" />
</template>

<script setup>
import JourneyPage from './pages/JourneyPage.vue'
import Header from './components/Header.vue'
import { defineStore } from 'pinia'


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #482b20;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

body {
  margin: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

html {
  height: 100%;
}
</style>
