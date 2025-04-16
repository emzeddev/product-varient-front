<template>
    <div class="flex flex-col gap-2 relative w-full border p-4 rounded-lg border-gray-200">
      <label for="category" class="text-sm font-medium text-gray-700">دسته‌بندی اصلی:</label>
      <input
        id="category"
        type="text"
        v-model="input"
        @input="showDropdown = true"
        @keydown.enter.prevent="handleEnter"
        @focus="showDropdown = true"
        class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500"
        placeholder="جستجو یا افزودن دسته‌بندی"
      />
  
      <!-- لیست دسته‌بندی‌ها -->
      <ul
        v-if="showDropdown && filteredCategories.length > 0"
        class="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="category in filteredCategories"
          :key="category.id"
          @click="selectCategory(category)"
          class="px-3 py-1 cursor-pointer hover:bg-indigo-100"
        >
          {{ category.name }}
        </li>
      </ul>
  
      <!-- افزودن دسته جدید -->
      <div
        v-if="showDropdown && input && filteredCategories.length === 0"
        class="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter دسته "{{ input }}" را اضافه کن
      </div>
  
      <!-- نمایش دسته انتخاب‌شده -->
      <div v-if="selected" class="text-xs text-gray-500 mt-1">دسته انتخاب‌شده: {{ selected.name }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // دسته‌بندی‌های موجود
  const categories = ref([
    { id: 1, name: 'گوشی های هوشمند' },
    { id: 2, name: 'لوازم جانبی' },
    { id: 3, name: 'گوشی های ساده' },
  ])
  
  const input = ref('')
  const showDropdown = ref(false)
  const selected = ref(null)
  
  const filteredCategories = computed(() => {
    return categories.value.filter((cat) =>
      cat.name.toLowerCase().includes(input.value.toLowerCase())
    )
  })
  
  // انتخاب از لیست
  function selectCategory(category) {
    selected.value = category
    input.value = category.name
    showDropdown.value = false
  }
  
  // افزودن دسته جدید
  function handleEnter() {
    if (!input.value.trim()) return
  
    const exists = categories.value.find(
      (c) => c.name.toLowerCase() === input.value.toLowerCase()
    )
    if (!exists) {
      const newCategory = {
        id: Date.now(),
        name: input.value.trim(),
      }
      categories.value.push(newCategory)
      selected.value = newCategory
    } else {
      selected.value = exists
    }
  
    input.value = selected.value.name
    showDropdown.value = false
  }
  </script>
  