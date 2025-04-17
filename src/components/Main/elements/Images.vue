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

      <!-- <div class="mt-4 text-left">
        <button
          class="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition cursor-pointer"
          @click="setProductImagesOnStore()"
        >
          ذخیره تغییرات
        </button>
      </div> -->
    </div>
</template>
  
<script setup>
  import { reactive, computed, getCurrentInstance, toRaw } from 'vue'
  import store from '@/store/index.js'
  
  const { appContext } = getCurrentInstance()
  let idCounter = 2

  const images = computed(() => store.getters.getProductImages)
  


  // const show_alert = (obj) => {
  //   const {$toast} = appContext.config.globalProperties;

  //   $toast(obj.text, {
  //     "type": obj.type,
  //     "dangerouslyHTMLString": true,
  //     "position": "bottom-right",
  //     "transition": "flip",
  //     "dir": "rtl"
  //   })
  // }
  
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

  // const setProductImagesOnStore = async (obj) => {
  //   const validate = await validateImages()
  //     .then((result) => {

  //       const plainImages = JSON.parse(JSON.stringify(images))
  //       store.dispatch('updateProductImages', plainImages)

  //       show_alert({
  //         text: "تغییرات اعمال شد",
  //         type: 'success',
  //       })
  //     })
  //     .catch((err) => {
  //       show_alert({
  //         text: err.message,
  //         type: 'error',
  //       })
  //     })
  // }

  


  // const validateImages = () => {
  //   const allFilesPresent = images.every(image => image.file !== null);
  //   const mainImagesCount = images.filter(image => image.isMain).length;

  //   return new Promise((resolve, reject) => {
  //     if (!allFilesPresent) {
  //       reject({
  //         valid: false,
  //         message: 'برای تمامی عکس ها فایل مورد نظر را باید انتخاب کنید',
  //       });
  //     }

  //     if(mainImagesCount !== 1) {
  //       reject({
  //         valid: false,
  //         message: 'یکی از عکس ها را به عنوان عکس اصلی انتخاب کنید',
  //       });
  //     }

  //     resolve({
  //       valid: true,
  //       message: 'همه چیز اوکیه ✅',
  //     });
  //   });
  // };


  
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