<template>
    <div class="border border-gray-200 rounded-lg  bg-white">
      <h3 class="text-sm font-semibold text-gray-800  border-b border-gray-200 p-4">مشخصات</h3>
  
      <!-- هدر -->
      <div class="grid grid-cols-12 text-sm font-medium text-gray-600 mb-2  border-b border-gray-200">
        <div class="col-span-1 p-4  border-l border-gray-200 text-center">تغییر جایگاه</div>
        <div class="col-span-5 text-center p-4 border-l border-gray-200">ویژگی</div>
        <div class="col-span-5 text-center p-4 border-l border-gray-200">مقدار</div>
        <div class="col-span-1 text-center p-4 ">حذف</div>
      </div>
  
      <!-- مشخصات -->
      <div
        v-for="(spec, index) in specifications"
        :key="spec.id"
        class="grid grid-cols-12 gap-2 mb-2 items-center relative"
      >
        <!-- درگ بالا/پایین -->
        <div class="col-span-1 flex flex-col items-center text-gray-400 text-sm">
          <button @click="moveUp(index)" :disabled="index === 0" class="hover:text-gray-600 disabled:opacity-30">
            <i class="ti ti-chevron-up"></i>
          </button>
          <button @click="moveDown(index)" :disabled="index === specifications.length - 1" class="hover:text-gray-600 disabled:opacity-30">
            <i class="ti ti-chevron-down"></i>
          </button>
        </div>
  
        <!-- فیلد ویژگی با سرچ و افزودن -->
        <div class="col-span-5 relative">
          <input
            v-model="spec.featureInput"
            @focus="spec.dropdownOpen = true"
            @input="onFeatureInput(index)"
            @keydown.enter.prevent="addNewFeature(index)"
            type="text"
            placeholder="جستجوی ویژگی..."
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
          />
          <!-- لیست نتایج -->
          <ul
            v-if="spec.dropdownOpen && filteredFeatures(index).length > 0"
            class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 text-sm text-gray-800 max-h-48 overflow-y-auto"
          >
            <li
              v-for="feature in filteredFeatures(index)"
              :key="feature"
              @click="selectFeature(index, feature)"
              class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
            >
              {{ feature }}
            </li>
          </ul>
          <!-- اگر موردی پیدا نشد -->
          <div
            v-if="spec.dropdownOpen && spec.featureInput && filteredFeatures(index).length === 0"
            class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 px-3 py-2 text-sm text-gray-600"
          >
            با Enter ویژگی "{{ spec.featureInput }}" را اضافه کن
          </div>
        </div>
  
        <!-- مقدار -->
        <div class="col-span-5">
          <input
            v-model="spec.value"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"
            placeholder="مقدار"
          />
        </div>
  
        <!-- حذف -->
        <div class="col-span-1 text-center">
          <button @click="removeSpec(index)" class="text-red-500 hover:text-red-700">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
  
      <!-- افزودن -->
      <div class="mt-4 text-right px-4 py-2 border-t border-gray-200">
        <button
          @click="addSpec"
          class="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
        >
          <i class="ti ti-plus"></i>
          افزودن
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  let nextId = 1
  
  // ویژگی‌های پیش‌فرض
  const features = reactive([
    'ابعاد',
    'وزن',
    'توان مصرفی',
    'نوع صفحه نمایش',
    'ظرفیت',
    'رنگ',
    'جنس بدنه',
    'قابلیت تنظیم دما',
    'نوع موتور',
    'استاندارد انرژی',
    'گنجایش مخزن',
    'فیلتر قابل شستشو',
  ])
  
  // لیست مشخصات
  const specifications = reactive([
    { id: nextId++, feature: '', featureInput: '', value: '', dropdownOpen: false },
  ])
  
  // اضافه کردن ردیف
  function addSpec() {
    specifications.push({ id: nextId++, feature: '', featureInput: '', value: '', dropdownOpen: false })
  }
  
  // حذف
  function removeSpec(index) {
    specifications.splice(index, 1)
  }
  
  // جابجایی بالا/پایین
  function moveUp(index) {
    if (index === 0) return
    const temp = specifications[index - 1]
    specifications[index - 1] = specifications[index]
    specifications[index] = temp
  }
  
  function moveDown(index) {
    if (index === specifications.length - 1) return
    const temp = specifications[index + 1]
    specifications[index + 1] = specifications[index]
    specifications[index] = temp
  }
  
  // هنگام تایپ
  function onFeatureInput(index) {
    specifications[index].feature = ''
    specifications[index].dropdownOpen = true
  }
  
  // فیلتر لیست ویژگی‌ها
  function filteredFeatures(index) {
    const keyword = specifications[index].featureInput?.toLowerCase() || ''
    return features.filter((f) => f.toLowerCase().includes(keyword))
  }
  
  // انتخاب از لیست
  function selectFeature(index, feature) {
    specifications[index].feature = feature
    specifications[index].featureInput = feature
    specifications[index].dropdownOpen = false
  }
  
  // افزودن ویژگی جدید با Enter
  function addNewFeature(index) {
    const input = specifications[index].featureInput.trim()
    if (input && !features.includes(input)) {
      features.push(input)
    }
    specifications[index].feature = input
    specifications[index].dropdownOpen = false
  }
  </script>
  