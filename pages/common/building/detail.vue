<template>
    <div class="card">
        <form>
            <label for="building_id">Building ID</label><br>
            <input type="text" id="building_id" name="buidling_id" value="A01-01" readonly><br>
            <label for="building_address">Address</label><br>
            <span type="input" id="building_address" name="buidling_address" role="textbox" contenteditable
                aria-readonly="true">144
                Tran Duy
                Phuong,
                Binh
                Hung Hoa, Binh Tan</span><br>
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
        <img src="/image/building.jpg">
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
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 100%;
    margin: 20px auto;
    padding: 16px;
    text-align: left;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: flex-start;
}

.card form {
    display: inline;
}

input {
    border: 2px solid grey;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
}

span {
    border: 2px solid grey;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
}

.card img {
    margin-top: 0;
    width: 25%;
    height: 25%;
}
</style>