<template>
    <div class="flex flex-col gap-2 w-full max-w-md relative">
      <label for="brand" class="text-sm font-medium text-gray-700">برند:</label>
  
      <!-- فیلد ورودی برند -->
      <input
        id="brand"
        type="text"
        v-model="input"
        @focus="showDropdown = true"
        @input="showDropdown = true"
        @keydown.enter.prevent="handleEnter"
        class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500 w-full"
        placeholder="جستجوی برند یا افزودن جدید"
      />
  
      <!-- لیست برندهای پیشنهادی -->
      <ul
        v-if="showDropdown && filteredBrands.length > 0"
        class="absolute top-full left-0 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="brand in filteredBrands"
          :key="brand"
          @click="selectBrand(brand)"
          class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
        >
          {{ brand }}
        </li>
      </ul>
  
      <!-- گزینه افزودن برند جدید -->
      <div
        v-if="showDropdown && input && filteredBrands.length === 0"
        class="absolute top-full left-0 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter برند "{{ input }}" را اضافه کن
      </div>
  
      <!-- نمایش برند انتخاب‌شده -->
      <div v-if="selectedBrand" class="text-xs text-gray-500 mt-1">
        برند انتخاب‌شده: <span class="font-semibold text-gray-700">{{ selectedBrand }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const input = ref('')
  const showDropdown = ref(false)
  const selectedBrand = ref(null)
  
  // لیست برندهای محبوب لوازم خانگی
  const brands = ref([
    'سامسونگ',
    'ال‌جی',
    'بوش',
    'اسنوا',
    'دوو',
    'کنوود',
    'هیتاچی',
    'الکترولوکس',
    'آبسال',
    'پاکشوما',
    'جی‌پلاس',
    'آاگ',
    'پارس‌خزر',
    'بکو',
    'هایر',
  ])
  
  // برندهای فیلترشده براساس تایپ کاربر
  const filteredBrands = computed(() => {
    const keyword = input.value.toLowerCase()
    return brands.value.filter((brand) =>
      brand.toLowerCase().includes(keyword)
    )
  })
  
  // انتخاب برند از لیست
  function selectBrand(brand) {
    selectedBrand.value = brand
    input.value = brand
    showDropdown.value = false
  }
  
  // افزودن برند جدید در صورت عدم وجود
  function handleEnter() {
    const value = input.value.trim()
    if (!value) return
  
    const exists = brands.value.includes(value)
    if (!exists) {
      brands.value.push(value)
    }
  
    selectBrand(value)
  }
  </script>
  