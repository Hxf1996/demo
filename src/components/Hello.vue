<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{ hello }}</h2>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
    computed: {
        ...mapGetters({
            hello: 'getHello',
        }),
    },
};
</script>

<style scoped>
h1, h2 {
    font-weight: normal;
}
</style>
