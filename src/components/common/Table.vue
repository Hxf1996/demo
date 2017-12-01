<template>
    <table class="table table-hover">
        <thead>
            <tr>
                <th v-for="(head, index) in tableData.head" :key="index"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in table.datas" :key="index">
                <th v-for="one in data" :key="one.id"></th>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        tableData: {
            type: Object,
        },
    },
};
</script>

<style scoped>
</style>