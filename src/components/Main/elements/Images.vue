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
              v-if="!image.preview"
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
              v-if="image.preview"
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
          class="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <i class="ti ti-plus"></i>
          افزودن تصویر
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  let idCounter = 1
  
  const images = reactive([
    {
      id: idCounter++,
      file: null,
      preview: '',
      alt: '',
      isMain: false,
    },
  ])
  
  function addNewImage() {
    images.push({
      id: idCounter++,
      file: null,
      preview: '',
      alt: '',
      isMain: false,
    })
  }
  
  function removeImage(index) {
    images.splice(index, 1)
  }
  
  function setMainImage(index) {
    images.forEach((img, i) => {
      img.isMain = i === index
    })
  }
  
  function handleImageUpload(event, index) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        images[index].preview = reader.result
        images[index].file = file
      }
      reader.readAsDataURL(file)
    }
  }
  </script>
  