<template>
    <div>
        <form>
            <label for="building_id">Building ID</label><br>
            <input type="text" id="building_id" name="buidling_id" value="A01-01" readonly><br>
        </form>
    </div>
</template>

<script lang="ts" setup>
// ---------------------- Metadata ----------------------
definePageMeta({
    name: 'Building Detail',
    layout: 'main',
    // middleware: ['authorization-manager']
});

useHead({
    title: 'Building Detail',
    meta: [
        {
            name: 'description',
            content: 'Detail of a building in the system',
        },
    ],
});
</script>

<style></style>