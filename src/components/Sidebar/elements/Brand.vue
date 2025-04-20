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


      <span 
        v-if="showDropdown && filteredBrands.length > 0"
        @click="showDropdown = false" 
        class="absolute top-[70px] left-[0px] w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
        &times;
      </span>
  
      <!-- لیست برندهای پیشنهادی -->
      <ul
        v-if="showDropdown && filteredBrands.length > 0"
        class="absolute top-16 left-0 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="brand in filteredBrands"
          :key="brand"
          @click="selectBrand(brand)"
          class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
        >
          {{ brand.title }}
        </li>
      </ul>
  
      <!-- گزینه افزودن برند جدید -->
      <div
        v-if="showDropdown && input && filteredBrands.length === 0"
        class="absolute top-16 left-0 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter برند "{{ input }}" را اضافه کن
      </div>
  
      <!-- نمایش برند انتخاب‌شده -->
      <div v-if="selectedBrand" class="text-xs text-gray-500 mt-1">
        برند انتخاب‌شده: <span class="font-semibold text-gray-700">{{ selectedBrand.title }}</span>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, computed, onMounted, getCurrentInstance } from 'vue'
  import store from '@/store/index.js'
  
  const input = ref('')
  const showDropdown = ref(false)
  const selectedBrand = ref(null)
  const { appContext } = getCurrentInstance()
  
  // لیست برندهای محبوب لوازم خانگی
  const brands = computed(() => store.getters.getBrandsList)

  onMounted(() => {
    store.dispatch('getBrandsList')
  })

  const show_alert = (obj) => {
    const {$toast} = appContext.config.globalProperties;

    $toast(obj.text, {
      "type": obj.type,
      "dangerouslyHTMLString": true,
      "position": "bottom-right",
      "transition": "flip",
      "dir": "rtl"
    })
  }
  
  // برندهای فیلترشده براساس تایپ کاربر
  const filteredBrands = computed(() => {
    const keyword = input.value
    return brands.value.filter((brand) =>
      brand.title.toLowerCase().includes(keyword)
    )
  })
  
  // انتخاب برند از لیست
  function selectBrand(brand) {
    selectedBrand.value = brand
    input.value = brand.title
    showDropdown.value = false

    store.dispatch('setProductBrandId', brand.id)
  }
  
  // افزودن برند جدید در صورت عدم وجود
  const handleEnter = async () => {
    const value = input.value.trim()
    if (!value) return
  
    const exists = brands.value.find(
      (b) => b.title === input.value
    )

    if (!exists) {

      const result = await store.dispatch("saveBrand", {title: input.value.trim()}).then(res => {
        show_alert({
          text: res.message,
          type: 'success',
        })

        // console.log(res.brand);

        selectBrand(res.brand)

      }).catch(err => {
        show_alert({
          text: err.message,
          type: 'error',
        })
      })
    }

  }
  </script>
  