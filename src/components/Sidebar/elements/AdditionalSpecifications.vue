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
            v-model="isactive"
            class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <span class="text-sm text-gray-700">فعال</span>
        </label>
      </div>
  
      <!-- شناسه کالا -->
      <div class="mb-4">
        <label for="product_identifier"  class="block text-sm font-medium text-gray-700 mb-1">
          شناسه کالا
        </label>
        <input
          id="product_identifier"
          v-model="sku_number"
          type="number"
          disabled
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 disabled:bg-gray-200 disabled:text-gray-500" 
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
          v-model="guarantee"
          type="text"
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-800"
          placeholder="مثلاً: 18 ماهه شرکتی"
        />
      </div>
    </div>
</template>
  
  <script setup>
  import { reactive, computed, onMounted } from 'vue'
  import store from '@/store/index.js'


  onMounted(() => {
    const skurandom = Math.floor(1000000 + Math.random() * 9000000).toString();
    store.dispatch('updateProductSkuNumber', Number(skurandom))
  })

  const isactive = computed({
    get() {
      return store.getters.getProductIsActive
    },
    set(value) {
      store.dispatch('updateProductIsActive', value)
    },
  })

  const sku_number = computed({
    get() {
      return store.getters.getProductSkuNumber
    },
    set(value) {
      store.dispatch('updateProductSkuNumber', value)
    },
  })

  const guarantee = computed({
    get() {
      return store.getters.getProductGuarantee
    },
    set(value) {
      store.dispatch('updateProductGuarantee', value)
    },
  })

  
  const form = reactive({
    available: true,
    product_identifier: '',
    guarantee: ''
  })
  </script>
  