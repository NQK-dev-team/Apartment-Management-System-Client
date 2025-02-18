<template>
    <div class="card flex items-center justify-around">
        <form>
            <div class="row flex items-center justify-around">
                <div class="column">
                    <label for="building_id">{{ $t('buildingID') }}</label><br>
                    <input type="text" id="building_id" name="buidling_id" value="A01-01" readonly><br>
                    <label for="building_address">{{ $t('address') }}</label><br>
                    <textarea id="building_address"
                        name="building_address">144 Tran Duy Phuong, Binh Hung Hoa, Binh Tan</textarea><br>
                    <label for="building_name">{{ $t('buildingName') }}</label><br>
                    <input type="text" id="building_name" name="buidling_name" value="A01-01" readonly><br>
                    <label for="building_floors">{{ $t('numberFloors') }}</label><br>
                    <input type="text" id="building_floors" name="buidling_floors" value="12" readonly><br>

                </div>
                <div class="column">
                    <label for="building_rooms">{{ $t('numberRooms') }}</label><br>
                    <input type="text" id="building_rooms" name="buidling_rooms" value="72" readonly><br>
                    <label for="contracted_rooms">{{ $t('contractedRooms') }}</label><br>
                    <input type="text" id="contracted_rooms" name="contracted_rooms" value="32" readonly><br>
                    <label for="paid_rooms">{{ $t('paidRooms') }}</label><br>
                    <input type="text" id="paid_rooms" name="Paid_rooms" value="32" readonly><br>
                    <label for="unpaid_rooms">{{ $t('unpaidRooms') }}</label><br>
                    <input type="text" id="unpaid_rooms" name="unpaid_rooms" value="0" readonly><br>
                </div>
            </div>
        </form>
        <div class="pic">
            <img src="/image/building.jpg">
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>{{ $t('no') }}</th>
                <th>{{ $t('managerName') }}</th>
                <th>{{ $t('employeeID') }}</th>
                <th>{{ $t('ssn') }}</th>
                <th>{{ $t('phone') }}</th>
                <th>{{ $t('start') }}</th>
                <th>{{ $t('end') }}</th>
                <th>{{ $t('actions') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Nguyen Van A</td>
                <td>123456789</td>
                <td>987654321</td>
                <td>0987654321</td>
                <td>01/01/2020</td>
                <td>N/A</td>
                <td>
                    <a class="adj" href="#">Adjust</a>
                    <a class="del" href="#">&nbsp;&nbsp;Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
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
    display: flex;
    flex-wrap: wrap;
}

/* .column {
    float: left;
    flex: 50%;
}

.row:after {
    content: "";
    display: table;
    clear: both;
} */

.row {
    display: flex;
    column-gap: 25%;
}

.column {
    flex: 50%;
}

input {
    border: 2px solid grey;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
}

textarea {
    border: 2px solid grey;
    border-radius: 10px;
    padding-left: 2%;
    padding-right: 2%;
}

.pic {
    max-width: 20%;
}

table {
    width: 100%;
    text-align: center;
}

.adj {
    color: deepskyblue;
}

.adj:hover {
    color: grey;
}

.del {
    color: red;
}

.del:hover {
    color: grey;
}
</style>