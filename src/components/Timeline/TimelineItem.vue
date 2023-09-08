
  
<script setup>

const props = defineProps(['item', 'nextItem', 'lastItem', 'isFirst', 'isLast'])
const item = props.item;
const nextItem = props.nextItem;
const lastItem = props.lastItem;


function dateContent(index) {
    var date = item.start_date.substring(0, 2);
    var is_start = true;
    var is_end = true;

    if (lastItem && lastItem.start_date) {
        var last_date = lastItem.start_date.substring(0, 2);
        is_start = date != last_date;
    }
    if (nextItem && nextItem.start_date) {
        var next_date = nextItem.start_date.substring(0, 2);
        is_end = date != next_date;
    }

    var classes = 'vert-line';
    if (is_start) classes += ' start-vert-line'
    if (is_end) classes += ' end-vert-line'

    var date_text = `<div class="date-text" style="border-color:${item.color}">${date}</div>`

    return `<div class="${classes}" style="background-color:${item.color}">${is_start ? date_text : ''}</div>`
}
function costContent() {
    if (item.price_nzd !== undefined)
        return '$' + item.price_nzd;
    return '$--'
}
function titleContent() {
    var title;
    if (item.type == 'activity') {
        title = item.title
    } else {
        title = item.title
    }
    return title
}

function timeContent() {
    if (item.end_time !== undefined && item.end_time.length > 0 && item.type != 'accommodation') {
        return item.start_time + '<br>' + item.end_time
    }
    if (item.start_time !== undefined && item.start_time.length > 0) {
        return item.start_time
    }
    return ""
}




function summarizeDescription() {
    if (item.description !== undefined) {
        if (item.description.length < 100) {
            return item.description
        }
        return item.description.substring(0, 100) + '...'
    }
    return ""
}



</script>

<template>
    <div class="item-content" :class="[item.type]">
        <div class="date" v-html="dateContent()"></div>
        <div v-if="['activity'].includes(item.type)" class="tab">
            <div class="vert-line"></div>
        </div>
        <div class="box">
            <div class="vert-contents">
                <div class="title-text">
                    <div v-if="timeContent() !== ''" class="time" v-html="timeContent()">

                    </div>
                    <img src="../../assets/car.png" v-if="item.transport_mode == 'car'" />
                    <img src="../../assets/train.png" v-if="item.transport_mode == 'train'" />
                    <img src="../../assets/plane.png" v-if="item.transport_mode == 'plane'" />
                    <img src="../../assets/home.png" v-if="item.type == 'accommodation'" />
                    <img src="../../assets/luggage.png" v-if="item.type == 'accommodation-checkout'" />

                    {{ titleContent() }}
                </div>
                <div v-if="item.description && item.type != 'accommodation'" class="description">
                    {{ summarizeDescription() }}
                </div>
            </div>
        </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0px;
    gap: 0px;
    justify-content: space-between;
    align-items: stretch;
    cursor: pointer;
    flex-grow: 1;
}

.item-content.accommodation .box,
.item-content.accommodation-checkout .box,
.item-content.transport .box {
    background-color: #fff4e7;
    color: #000;
    font-weight: 600;
    margin: -1px 0 0 0;
    padding: 0px 6px;
    font-size: 0.9rem;
    border: none;
}

.item-content.transport .box {
    color: #d78c74;
    font-weight: 400;
}


.item-content.accommodation .title-text,
.item-content.accommodation-checkout .title-text,
.item-content.transport .title-text {
    padding: 3px;
    padding-left: 0;
}

.item-content.accommodation .vert-contents,
.item-content.accommodation-checkout .vert-contents,
.item-content.transport .vert-contents {
    align-items: center;
}

.item-content.accommodation .time,
.item-content.accommodation-checkout .time,
.item-content.transport .time {
    position: absolute;
    left: 0;
}


.item-content>div {
    display: flex;
    flex-direction: column;
}

.item-content .date {
    flex-shrink: 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: #f45d78;
    border-right: 2px solid black;
    display: flex;
    align-items: flex-start;
}

.item-content .box {
    flex-grow: 2;
    padding: 6px;
    text-align: left;
    padding-left: 7px;
    border-bottom: 1px dashed #ffe1cc;
}

.item-content .vert-contents {
    display: flex;
    flex-direction: column;
    position: relative;
    flex-grow: 2;
}

.item-content .tab {
    width: 0px;
    flex-shrink: 0;
}

.item-content .title-text {
    display: flex;
    gap: 0.4rem;
    padding-left: 0.1rem;
    align-items: center;
    flex-grow: 2;
}

.item-content img {
    height: 16px;
    margin-top: 2px;
    padding-bottom: 0.1rem;
    padding-left: 0.2rem;
}


.item-content .time {
    padding: 0.1rem 0.3rem;
    font-size: 0.7em;
    font-weight: 600;
    color: #d78c74;
    background-color: #fff4e7;
    border-radius: 5px;
}


.item-content .description {
    font-size: 0.8rem;
    color: #c7bbb9;
    padding: 0.1rem;
    padding-bottom: 0.2rem;
}
</style>
<style>
.date .start-vert-line {
    padding-top: 2px;
    color: #000;
}

.date .vert-line {
    height: 100%;
    width: 24px;
    display: flex;
    position: relative;
    top: 11px;
    justify-content: center;
}

.date .end-vert-line {
    padding-bottom: 1px;
}

.date .date-text {
    position: relative;
    top: -12px;
    border-width: 1px;
    border-style: solid;
    background-color: white;
    width: 22px;
    height: 22px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.location .vert-line {
    height: 100%;
    border-left: 1px dashed #ffbdbd;
}
</style>