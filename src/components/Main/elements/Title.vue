<template>
    <div class="flex flex-col gap-4 border p-4 rounded-lg border-gray-200">
      <div class="flex flex-col gap-1">
        <label for="faName" class="text-sm font-medium text-default-700 mb-2">عنوان:</label>
        <input
          id="faName"
          name="name"
          type="text"
          v-model="form.name"
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
          v-model="form.english_name"
          autocomplete="off"
          class="border border-gray-200 rounded px-3 py-2 text-sm text-left text-default-800 ltr focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const form = reactive({
    name: '',
    english_name: ''
  })
  </script>
  