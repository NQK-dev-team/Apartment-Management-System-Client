<template>
    <div>
        <form>
            <label for="building_id">Building ID</label><br>
            <input type="text" id="building_id" name="buidling_id" value="A01-01" readonly><br>
            <label for="building_address">Address</label><br>
            <input type="text" id="building_address" name="buidling_address"
                value="144 Tran Duy Phuong, Binh Hung Hoa, Binh Tan" readonly><br>
            <label for="building_name">Building Name</label><br>
            <input type="text" id="building_name" name="buidling_name" value="A01-01" readonly><br>
            <label for="building_floors">Number of Floors</label><br>
            <input type="text" id="building_floors" name="buidling_floors" value="12" readonly><br>
            <label for="building_rooms">Number of Rooms</label><br>
            <input type="text" id="building_rooms" name="buidling_rooms" value="72" readonly><br>
            <label for="contracted_rooms">Number of Contracted Rooms</label><br>
            <input type="text" id="contracted_rooms" name="contracted_rooms" value="32" readonly><br>
            <label for="paid_rooms">Number of Paid Rooms</label><br>
            <input type="text" id="paid_rooms" name="Paid_rooms" value="32" readonly><br>
            <label for="unpaid_rooms">Number of Unpaid Rooms</label><br>
            <input type="text" id="unpaid_rooms" name="unpaid_rooms" value="0" readonly><br>
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

<style>
input{
    width:fit-content;
}
</style>