
  
<script setup>
import { focusItem, showAccommodation, pinItem } from '@/utilities/map/Markers';
import { ref, watch } from 'vue';
import TimelineItem from './TimelineItem.vue'



const props = defineProps(['timeline_data'])
const timeline_data = props.timeline_data;

const selected_item = ref(null);

watch(props, (newVal) => {
    console.log("updated")
    if (timeline_data) {
        displayTimelineOnMap(timeline_data.value);
    }
})

async function displayTimelineOnMap(data) {
    for (var item of data) {
        if (item.place && item.type != 'accommodation-checkout') {
            if (item.type == 'accommodation') {
                await showAccommodation(item)
            } else {
                await pinItem(item)
            }
        }
    }
}


async function select(item, index) {
    if (selected_item.value == index) {
        selected_item.value = null;
    } else {
        selected_item.value = index;

        focusItem(item);
    }
}


</script>

<template>
    <div class="parent">
        <div class="item" @click="select(item, index)" :class="{ selected: selected_item == index }"
            v-for="(item, index) in timeline_data">
            <TimelineItem :item="item" :lastItem="timeline_data[index - 1]" :nextItem="timeline_data[index + 1]"
                :isFirst="index == 0" :isLast="index == timeline_data.length - 1">
            </TimelineItem>
        </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent {
    position: relative;
    flex-direction: column;
    display: flex;
}


.item {
    display: flex;
    flex-direction: row;
    transition: background-color 0.2s ease-in-out,
        padding 0.2s ease-in-out;
    user-select: none;
}


.item>div>div {
    display: flex;
    flex-direction: column;
}

.item:hover:not(.selected) {
    background-color: #fff0f0;
}

.item.selected {
    background-color: #ffe1e1;
}
</style>
<style>
.parent .item:last-child {
    overflow: hidden;
}

.parent .item:first-child .date .vert-line {
    margin-top: -11px;
    padding-top: 15px;
}
</style>