<template>
     <div class="flex flex-col gap-2 relative w-full border p-4 rounded-lg border-gray-200">
      <label class="text-sm font-medium text-gray-700">سایر دسته‌بندی‌ها:</label>
  
      <!-- لیست دسته‌های انتخاب‌شده -->
      <div class="flex flex-wrap gap-2 border border-gray-300 rounded p-2 min-h-[42px]">
        <span
          v-for="(category, index) in selectedCategories"
          :key="category.id"
          class="flex items-center gap-1 bg-gray-500 text-white text-sm px-2 py-1 rounded"
        >
          {{ category.name }}
          <button @click="removeCategory(index)" class="text-red-300 hover:text-red-500">
            <i class="ti ti-x text-xs"></i>
          </button>
        </span>
  
        <!-- فیلد جستجو -->
        <input
          v-model="input"
          @focus="showDropdown = true"
          @input="showDropdown = true"
          @keydown.enter.prevent="addCategory"
          placeholder="جستجوی دسته‌بندی..."
          class="flex-1 min-w-[100px] border-none focus:outline-none text-sm text-gray-800"
        />
      </div>
  
      <!-- لیست پیشنهادها -->
      <ul
        v-if="showDropdown && filteredCategories.length > 0"
        class="z-10 mt-1 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="cat in filteredCategories"
          :key="cat.id"
          @click="selectCategory(cat)"
          class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
        >
          {{ cat.name }}
        </li>
      </ul>
  
      <!-- گزینه افزودن جدید -->
      <div
        v-if="showDropdown && input && filteredCategories.length === 0"
        class="z-10 mt-1 bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter دسته "{{ input }}" را اضافه کن
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const input = ref('')
  const showDropdown = ref(false)
  const selectedCategories = ref([])
  
  // دسته‌های موجود
  const categories = ref([
    { id: 1, name: 'گوشی های هوشمند' },
    { id: 2, name: 'لوازم جانبی' },
    { id: 3, name: 'گوشی های ساده' },
    { id: 4, name: 'hhgvghvgh' },
    { id: 5, name: 'عغارلاراللعغغ' },
  ])
  
  // خروجی فیلترشده برای پیشنهادها
  const filteredCategories = computed(() => {
    const query = input.value.toLowerCase()
    return categories.value.filter((c) => {
      return (
        c.name.toLowerCase().includes(query) &&
        !selectedCategories.value.find((sel) => sel.id === c.id)
      )
    })
  })
  
  // انتخاب از لیست
  function selectCategory(cat) {
    selectedCategories.value.push(cat)
    input.value = ''
    showDropdown.value = false
  }
  
  // حذف از لیست انتخاب‌شده
  function removeCategory(index) {
    selectedCategories.value.splice(index, 1)
  }
  
  // افزودن دسته جدید
  function addCategory() {
    const trimmed = input.value.trim()
    if (!trimmed) return
  
    const exists = categories.value.find((c) => c.name === trimmed)
    const alreadySelected = selectedCategories.value.find((c) => c.name === trimmed)
  
    if (!exists) {
      const newCat = { id: Date.now(), name: trimmed }
      categories.value.push(newCat)
      selectedCategories.value.push(newCat)
    } else if (!alreadySelected) {
      selectedCategories.value.push(exists)
    }
  
    input.value = ''
    showDropdown.value = false
  }
  </script>
  