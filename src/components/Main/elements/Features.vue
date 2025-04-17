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
        
          <span 
            v-if="spec.dropdownOpen && filteredFeatures(index).length > 0"
            @click="spec.dropdownOpen = false" 
            class="absolute top-[40px] left-0 w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
            &times;
          </span>

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
              :key="feature.id"
              @click="selectFeature(index, feature.name)"
              class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
            >
              {{ feature.name }}
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
  import { reactive , onMounted , getCurrentInstance, computed } from 'vue'
  import store from '@/store/index.js'
  


  onMounted(async () => {
    await store.dispatch('getAttributeList')
  })
  
  let nextId = 2
  
  // ویژگی‌های پیش‌فرض
  const features = computed(() => store.getters.getAttributeList)
  const { appContext } = getCurrentInstance()
  
  
  // لیست مشخصات
  const specifications = computed(() => {
    return store.getters.getProductSpecifications;
  })
  
  // اضافه کردن ردیف
  const addSpec = () => {
    store.dispatch('addProductSpecification', {
      id: nextId++,
      feature: '',
      value: '',
      featureInput: '',
      dropdownOpen: false,
    })
  }

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
  
  // حذف
  const removeSpec = (index) => {
    store.dispatch('removeProductSpecification', index)
  }
  
  // جابجایی بالا/پایین
  const moveUp =(index) => {
    if (index === 0) return
    const temp = specifications.value[index - 1]
    specifications.value[index - 1] = specifications.value[index]
    specifications.value[index] = temp
  }
  
  const moveDown =(index) => {
    if (index === specifications.value.length - 1) return
    const temp = specifications.value[index + 1]
    specifications.value[index + 1] = specifications.value[index]
    specifications.value[index] = temp
  }
  
  // هنگام تایپ
  const onFeatureInput =(index) => {
    specifications.value[index].feature = ''
    specifications.value[index].dropdownOpen = true
  }
  
  // فیلتر لیست ویژگی‌ها
  const filteredFeatures =(index) => {
    const keyword = specifications.value[index].featureInput?.toLowerCase() || ''
    return features.value.filter((f) => f.name.toLowerCase().includes(keyword))
  }
  
  // انتخاب از لیست
  const selectFeature =(index, feature) => {
    specifications.value[index].feature = feature
    specifications.value[index].featureInput = feature
    specifications.value[index].dropdownOpen = false
  }
  
  // افزودن ویژگی جدید با Enter
  const addNewFeature = async (index) => {
    if(filteredFeatures(index).length === 0) {
      
      const input = specifications.value[index].featureInput.trim()
      if (input) {
        const result = await store.dispatch("saveAttribute", input).then(res => {
          features.value.unshift({name: input})
          show_alert({
            text: res.message,
            type: 'success',
          })
        }).catch(err => {
          show_alert({
            text: err.message,
            type: 'error',
          })
        })
      }
      // specifications.value[index].feature = input
      // specifications.value[index].dropdownOpen = false
    }
  }
  </script>
  