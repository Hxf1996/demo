<template>
    <div class="carousel slide">
        <ol class="carousel-indicators">
            <li v-for="(one, index) in carouselConfig.data" :key="index" :class="{ active: index===currentIndex }" @mouseenter="play(index)" @mouseleave="start"></li>
        </ol>
        <transition-group tag="ul" class="carousel-inner" role="listbox" name="carousel" :style="{height: carouselConfig.height + 'px'}">
            <li v-for="(one, index) in carouselConfig.data" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="start" class="carousel-item">
                <img :src="one.image" :alt="one.desc" class="d-block img-fluid">
            </li>
        </transition-group>
        <a class="carousel-control-prev" role="button" @click="play(prev)">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" role="button" @click="play(next)">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>

export default {
    name: 'Carousel',
    created() {
        this.$nextTick(() => {
            this.start();
        });
    },
    props: {
        carouselConfig: {
            type: Object,
        },
    },
    data() {
        return {
            currentIndex: 0,
            timer: '',
        };
    },
    methods: {
        start() {
            this.timer = setInterval(() => {
                this.currentIndex = this.autoPlay(this.currentIndex);
            }, 4000);
        },
        stop() {
            clearInterval(this.timer);
            this.timer = null;
        },
        play(index) {
            this.stop();
            this.currentIndex = index;
        },
        autoPlay(index) {
            if (index >= this.carouselConfig.data.length - 1) {
                return 0;
            }
            return index + 1;
        },
    },
    computed: {
        prev() {
            return this.currentIndex === 0 ? this.carouselConfig.data.length - 1 : this.currentIndex - 1;
        },
        next() {
            return this.currentIndex >= this.carouselConfig.data.length - 1 ? 0 : this.currentIndex + 1;
        },
    },
};
</script>

<style scoped>
@import '../../assets/common';
@import '../../assets/animation';

.carousel-inner {
    padding-left: 0;
    margin-bottom: 0;

    & li img {
        margin-left: auto;
        margin-right: auto;
    }
}

.carousel-item {
    display: block;
    position: absolute;
}
</style>
