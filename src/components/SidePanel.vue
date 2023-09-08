
  
<script setup>
import { ref } from 'vue';
import Header from './Header.vue';




const content_width = ref(450);
const max_width = 600;
const min_width = 250;
const drag_hitbox_width = 16;

var drag_origin;
var width_origin;
const dragging = ref(false);


function drag(e) {
    var rel = width_origin - (e.clientX - drag_origin);
    content_width.value = Math.min(Math.max(rel, min_width), max_width);
}
function dragstart(e) {
    drag_origin = e.clientX;
    width_origin = content_width.value;
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', dragend)
    dragging.value = true;
}
function dragend(e) {
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', dragend)
    dragging.value = false;
}



</script>

<template>
    <div class="panel-parent">
        <div class="panel">
            <div class="drag-hitbox" @mousedown="dragstart">

            </div>
            <div class="content" :class="{ dragging: dragging }" :style="{ 'width': content_width + 'px' }">

                <Header></Header>
                <div class="content-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel-parent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 1rem 1rem 2rem 0;
    flex-direction: row-reverse;
    align-items: stretch;
    box-sizing: border-box;
    pointer-events: none;
}

.panel {
    pointer-events: all;
    position: relative;
}

.content {
    background-color: white;
    border-radius: 1rem;
    overflow: hidden;
    height: 100%;
    border-left: 0px solid #000;
    transition: border-left 0.1s ease-in-out;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 2px solid #000;
}

.content-content {
    overflow: auto;
}

.drag-hitbox:hover+.content {
    border-left: 3px solid #000;
}

.content.dragging {
    border-left: 6px solid #000 !important;
}

.drag-hitbox {
    position: absolute;
    height: 100%;
    left: v-bind((drag_hitbox_width / -2) + 'px');
    width: v-bind((drag_hitbox_width) + 'px');
    top: 0;
    cursor: ew-resize;
    user-select: none;
    -webkit-user-drag: none;
}
</style>
