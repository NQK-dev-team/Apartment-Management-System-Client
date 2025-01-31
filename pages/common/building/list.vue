<template>
  <div>
    <div class="card">
      <a href="#">
        <h4>{{ $t('building') }}</h4>
        <img src="/image/R.jpg">
        <div class="container">
          <p>144 Tran Duy Phuong, Binh Hung Hoa, Binh Tan</p>
          <p class="sub-info">ZZ {{ $t('floors') }} - CC {{ $t('rooms') }}</p>
        </div>
      </a>
      <div class="actions">
        <div class="update"> <button><svg class="h-8 w-8 text-neutral-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        <div class="delete">
          <button><svg class="h-8 w-8 text-neutral-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg></button>
        </div>
      </div>
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

.container {
  text-align: left;
}

.sub-info {
  color: grey;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions :hover {
  color: black;
}

.delete {
  margin-left: 20%;
}

.update {
  margin-right: 20%;
}
</style>
