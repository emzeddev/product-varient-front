<template>
    <div class="flex flex-col gap-6 border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col gap-1">
        <span class="text-base font-semibold text-gray-800">تصاویر</span>
        <span class="text-xs text-gray-500">
          بهترین نسبت طول به عرض تصویر: ۳ به ۲ - حداکثر حجم فایل: ۲ مگابایت
        </span>
      </div>
  
      <!-- هدر لیست -->
      <ul class="grid grid-cols-4 gap-2 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
        <li>حذف</li>
        <li>تصویر</li>
        <li>متن جایگزین</li>
        <li>اصلی</li>
      </ul>
  
      <!-- لیست تصاویر -->
      <ul class="flex flex-col gap-3">
        <li
          v-for="(image, index) in images"
          :key="image.id"
          class="grid grid-cols-4 gap-2 items-center border border-gray-200 rounded-md p-3 bg-white"
        >
          <!-- حذف -->
          <button
            @click="removeImage(index)"
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            <i class="ti ti-trash"></i>
          </button>
  
          <!-- انتخاب تصویر -->
          <div class="flex flex-col items-center gap-2">
            <label
              v-if="!image.preview && image.file == null"
              class="cursor-pointer text-indigo-600 hover:underline"
            >
              انتخاب تصویر
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload($event, index)"
              />
            </label>
            <img
              v-else-if="!Number.isInteger(image.id) && image.preview == ''"
              :src="image.file"
              alt="preview"
              class="h-16 w-auto rounded border border-gray-300"
            />
            <img
              v-else
              :src="image.preview"
              alt="preview"
              class="h-16 w-auto rounded border border-gray-300"
            />
          </div>
  
          <!-- متن جایگزین -->
          <input
            type="text"
            v-model="image.alt"
            placeholder="متن جایگزین"
            class="w-full rounded border border-gray-300 px-2 py-1 text-sm text-gray-800"
          />
  
          <!-- انتخاب اصلی -->
          <div class="flex justify-center">
            <input
              type="radio"
              name="mainImage"
              :checked="image.isMain"
              @change="setMainImage(index)"
              class="text-indigo-600 focus:ring-indigo-500"
            />
          </div>
        </li>
      </ul>
  
      <!-- دکمه افزودن -->
      <div class="pt-2">
        <button
          @click="addNewImage"
          class="mt-4 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 cursor-pointer"
        >
          <i class="ti ti-plus"></i>
          افزودن تصویر
        </button>
      </div>
    </div>
</template>
  
<script setup>
  import { reactive, computed, toRaw } from 'vue'
  import store from '@/store/index.js'
  
  let idCounter = 2

  const images = computed(() => store.getters.getProductImages)
  

  
  const addNewImage = () => {
    store.dispatch('addProductImage', {
      id: idCounter++,
      file: null,
      preview: '',
      alt: '',
      isMain: false,
    })
  }
  
  const removeImage = (index) => {
    store.dispatch('removeProductImage', index)
  }
  
  const setMainImage = (index) => {
    store.dispatch('setProductMainImage', index)
  }
  
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        store.dispatch('setProductImageFile', {
          index: index,
          file: event.target.files[0],
          preview: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }


  
  </script>
  

  <style>
/* Success toast: سبز */
.Toastify__toast--success {
  background-color: #28a745 !important; /* سبز Bootstrap */
  color: #fff !important;
}

/* Error toast: قرمز */
.Toastify__toast--error {
  background-color: #dc3545 !important; /* قرمز Bootstrap */
  color: #fff !important;
}

/* استایل عمومی همه toastها (اختیاری برای یکدست شدن) */
.Toastify__toast {
  border-radius: 8px !important;
  font-family: "Vazirmatn", sans-serif !important;
  font-size: 14px !important;
  padding: 12px 16px !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15) !important;
  font-weight: bold!important;
}
    
  </style>