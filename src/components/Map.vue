
  
<script setup>
import { initGoogleMapIn } from '@/utilities/map/Google.js'


initGoogleMapIn("map");

</script>

<template>
  <div class="parent">
    <div id="map">

    </div>
    <div id="map-shadow"></div>
  </div>
</template>

<!-- box-shadow: inset 0 0 30px 0px #8d000045; -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent {
  position: relative;
  flex-direction: column;
  display: flex;
  align-items: stretch;
}

#map {
  flex-grow: 1;
}

#map-shadow {

  z-index: 100000;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

.autocorrect {
  position: absolute;
  z-index: 1000;

}
</style>
<style>
.gm-fullscreen-control {
  margin-bottom: 0 !important;
}
</style>