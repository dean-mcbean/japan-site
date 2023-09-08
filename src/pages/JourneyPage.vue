

<script>
import SidePanel from '../components/SidePanel.vue'
import Timeline from '../components/Timeline/Timeline.vue'
import Map from '../components/Map.vue'
import { ref } from 'vue';
import { loadSchedule } from '@/utilities/APIUtils';



const timeline_data = ref([]);

loadSchedule().then(async (data) => {
  timeline_data.value = data;
});









export default {
  name: 'JourneyPage',
  components: {
    SidePanel,
    Timeline,
    Map
  }
}
</script>



<template>
  <div class="page row">
    <Map class="map">this is a map</Map>
    <SidePanel>
      <Timeline :timeline_data="{ timeline_data }">

      </Timeline>
    </SidePanel>
  </div>
</template>


<style scoped>
.page {
  flex-grow: 1;
}

.row {
  display: flex;
  flex-direction: row;
}

.map {
  flex-grow: 1;
  background-color: #ffeeee;
}
</style>
