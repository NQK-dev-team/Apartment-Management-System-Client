<template>
  <div>
    <div class="card">
    <a href="#">
      <h4>{{$t('building')}}</h4>
      <img src="/image/R.jpg">
      <div class="container">
        <p>144 Tran Duy Phuong, Binh Hung Hoa, Binh Tan</p>
        <p class="sub-info">ZZ {{$t('floors')}} - CC {{ $t('rooms') }}</p>
      </div>
    </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ---------------------- Metadata ----------------------
definePageMeta({
  name: 'Building List',
  layout: 'main',
  // middleware: ['authorization-manager']
});

useHead({
  title: 'Building List',
  meta: [
    {
      name: 'description',
      content: 'List of buildings in the system',
    },
  ],
});
</script>

<style>
.card {
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 300px;
            margin: 20px auto;
            padding: 16px;
            text-align: center;
            font-family: Arial, sans-serif;
        }
.container{
  text-align: left;
}
.sub-info{
  color: grey;
}
</style>
