<template>
    <div class="flex flex-col gap-2 w-full border border-gray-200 rounded-lg p-4 bg-white">
      <label for="tags" class="text-sm font-medium text-gray-700">برچسب‌ها:</label>
  
      <div class="flex flex-wrap gap-2 border border-gray-300 rounded p-2 min-h-[42px] relative">
        <!-- برچسب‌های انتخاب‌شده -->
        <span
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded"
        >
          {{ tag }}
          <button @click="removeTag(index)" class="text-indigo-500 hover:text-indigo-800">
            <i class="ti ti-x text-xs"></i>
          </button>
        </span>
  
        <!-- فیلد تایپ -->
        <input
          v-model="input"
          @keydown.enter.prevent="addTag"
          @input="showDropdown = true"
          @focus="showDropdown = true"
          placeholder="افزودن برچسب..."
          class="flex-1 min-w-[100px] border-none focus:outline-none text-sm text-gray-800"
        />
      </div>
  
      <!-- لیست پیشنهادات -->
      <ul
        v-if="showDropdown && filteredTags.length > 0"
        class="absolute top-full mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="tag in filteredTags"
          :key="tag"
          @click="selectTag(tag)"
          class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
        >
          {{ tag }}
        </li>
      </ul>
  
      <!-- افزودن تگ جدید -->
      <div
        v-if="showDropdown && input && filteredTags.length === 0"
        class="absolute top-full mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter برچسب "{{ input }}" را اضافه کن
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const input = ref('')
  const selectedTags = ref([])
  const showDropdown = ref(false)
  
  // برچسب‌های پیشنهادی از قبل
  const tagSuggestions = ref([
    'سامسونگ a21',
    'galaxy a21',
    'پاوربانک شیائومی',
    'پاور 10000 میلیآمپر',
    'گوشی سامسونگ'
  ])
  
  // فیلتر پیشنهادات بر اساس ورودی
  const filteredTags = computed(() => {
    const keyword = input.value.toLowerCase()
    return tagSuggestions.value.filter(
      (tag) =>
        tag.toLowerCase().includes(keyword) &&
        !selectedTags.value.includes(tag)
    )
  })
  
  // افزودن تگ جدید
  function addTag() {
    const trimmed = input.value.trim()
    if (!trimmed || selectedTags.value.includes(trimmed)) return
  
    selectedTags.value.push(trimmed)
    input.value = ''
    showDropdown.value = false
  }
  
  // انتخاب از لیست
  function selectTag(tag) {
    if (!selectedTags.value.includes(tag)) {
      selectedTags.value.push(tag)
    }
    input.value = ''
    showDropdown.value = false
  }
  
  // حذف
  function removeTag(index) {
    selectedTags.value.splice(index, 1)
  }
  </script>
  