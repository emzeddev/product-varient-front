<template>
    <div class="flex flex-col gap-4 border p-4 rounded-lg border-gray-200">
      <div class="flex flex-col gap-1">
        <label for="faName" class="text-sm font-medium text-default-700 mb-2">عنوان فارسی :</label>
        <input
          id="faName"
          name="name"
          type="text"
          :value="fa_title"
          @input="updateProductFaTitle($event.target.value)"
          autocomplete="off"
          class="border border-gray-200 rounded px-3 py-2 text-sm text-default-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
  
      <div class="flex flex-col gap-1">
        <label for="enName" class="text-sm font-medium text-default-700 mb-2">عنوان انگلیسی:</label>
        <input
          id="enName"
          name="english_name"
          type="text"
          :value="en_title"
          @input="updateProductEnTitle($event.target.value)"
          autocomplete="off"
          class="border border-gray-200 rounded px-3 py-2 text-sm text-left text-default-800 ltr focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
</template>
  
<script setup>
  import { reactive, computed } from 'vue'
  import store from '@/store/index.js'

  // const store = useStore()

  const fa_title = computed(() => store.getters.getProductFaTitle)
  const en_title = computed(() => store.getters.getProductEnTitle)

  const updateProductFaTitle = (value) => {
    store.dispatch('updateProductFaTitle', value)
  }

  const updateProductEnTitle = (value) => {
    store.dispatch('updateProductEnTitle', value)
  }

  
  
</script>
  