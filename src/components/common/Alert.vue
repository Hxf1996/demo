<template>
    <div class="alert alert-warning" role="alert">
        <button type="button" class="close" aria-label="Close" @click.stop="close">
            <span aria-hidden="true">&times;</span>
        </button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    data() {
        return {
            active: false,
        };
    },
    methods: {
        open() {
            this.active = true;
        },
        close() {
            this.active = false;
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
@import '../../assets/common';
</style>