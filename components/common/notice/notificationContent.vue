<template>
    <div class="flex-1 flex flex-col overflow-auto">
        <div class="flex justify-between">
            <p class="italic">{{ t('date') }} 5, {{ t('month') }} 12, {{ t('year') }} 2024</p>
            <p class="font-bold">{{ t('sender') }}: Trịnh Văn Sơn</p>
        </div>
        <div class="flex justify-center">
            <h2 class="mt-3 text-3xl font-bold">Title</h2>
        </div>
        <div class="flex flex-col">
            <h2 class="mt-3 text-2xl font-bold">Notice content</h2>
            <p class="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nulla assumenda sint consequatur distinctio? Beatae aliquid omnis necessitatibus ea laudantium, quia placeat, ratione explicabo amet sed cumque, similique dicta accusantium. Doloribus, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque. Quisquam, voluptatum. Doloremque, cumque.
            </p>
        </div>
        <div class="flex justify-between">
            <img :src="svgPaths.placeholderImage" alt="" class="w-1/4">
            <img :src="svgPaths.placeholderImage" alt="" class="w-1/4">
            <img :src="svgPaths.placeholderImage" alt="" class="w-1/4">
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { svgPaths } from '~/consts/svg_paths';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();
</script>