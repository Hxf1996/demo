<template>
    <transition name="zoom">
        <div v-show="show" @click="toogle" class="modal show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content" @click.stop>
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
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

.modal-content {
    border-radius: initial;
}

.show {
    display: block;
}
</style>
