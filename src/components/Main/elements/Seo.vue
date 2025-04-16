<template>
    <div class="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 class="text-sm font-semibold text-gray-800 mb-4">سئوی محصول</h3>
  
      <div class="mb-4">
        <label for="seoTitle" class="block text-sm font-medium text-gray-700 mb-1">
          عنوان: <span class="text-xs text-gray-500">({{ title.length }}/90 کاراکتر)</span>
        </label>
        <input
          id="seoTitle"
          v-model="title"
          maxlength="90"
          name="seo_title"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
  
      <div class="mb-4">
        <label for="seoDescription" class="block text-sm font-medium text-gray-700 mb-1">
          توضیحات: <span class="text-xs text-gray-500">({{ description.length }}/150 کاراکتر)</span>
        </label>
        <textarea
          id="seoDescription"
          v-model="description"
          maxlength="150"
          name="seo_description"
          rows="3"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        ></textarea>
      </div>
  
      <div class="mt-6">
        <p class="text-sm font-medium text-gray-700 mb-2">نمایش در گوگل:</p>
        <div class="rounded border border-gray-200 p-4 text-sm">
          <p class="text-indigo-700 font-semibold truncate">
            /product/1/محصول-نمونه-تستی-...
          </p>
          <p class="text-green-700 font-bold mt-1">{{ title || 'عنوان محصول شما' }}</p>
          <p class="text-gray-600 mt-1">{{ description || 'توضیحات خلاصه‌ای از محصول شما در این قسمت نمایش داده خواهد شد.' }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const title = ref('')
  const description = ref('')
  </script>