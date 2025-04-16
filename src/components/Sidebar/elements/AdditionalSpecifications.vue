<template>
    <div class="border border-gray-200 rounded-lg p-4 bg-white">
      <h3 class="text-sm font-semibold text-gray-800 mb-4 flex items-center justify-between">
        مشخصات تکمیلی
      </h3>
  
      <!-- فعال بودن محصول -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="form.available"
            class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span class="text-sm text-gray-700">فعال</span>
        </label>
      </div>
  
      <!-- شناسه کالا -->
      <div class="mb-4">
        <label for="product_identifier" class="block text-sm font-medium text-gray-700 mb-1">
          شناسه کالا
        </label>
        <input
          id="product_identifier"
          v-model="form.product_identifier"
          type="text"
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800"
          placeholder="مثلاً: 123456789"
        />
      </div>
  
      <!-- گارانتی -->
      <div class="mb-2">
        <label for="guarantee" class="block text-sm font-medium text-gray-700 mb-1">
          گارانتی
        </label>
        <input
          id="guarantee"
          v-model="form.guarantee"
          type="text"
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800"
          placeholder="مثلاً: 18 ماهه شرکتی"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    available: true,
    product_identifier: '',
    guarantee: ''
  })
  </script>
  