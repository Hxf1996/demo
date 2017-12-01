<template>
    <transition name="transparent">
        <div v-show="show" @click="toogle" class="modal-backdrop"></div>
    </transition>
</template>

<script>
export default {
    name: 'BackDrop',
    props: {
        active: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        toogle() {
            this.show = !this.show;
            this.$emit('toogle');
        },
    },
    watch: {
        active() {
            this.show = this.active;
        },
    },
};
</script>

<style scoped>
@import '../../assets/common';
@import '../../assets/animation';

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
