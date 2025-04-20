<template>
    <div class="flex flex-col gap-2 w-full border border-gray-200 rounded-lg p-4 bg-white relative">
      <label for="tags" class="text-sm font-medium text-gray-700">برچسب‌ها:</label>
  
      <span 
          v-if="showDropdown && filteredTags.length > 0"
          @click="showDropdown = false" 
          class="absolute top-[90px] left-[-15px] w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
          &times;
      </span>

      <div class="flex relative flex-wrap gap-2 border border-gray-300 rounded p-2 min-h-[42px]">
        <!-- برچسب‌های انتخاب‌شده -->
        <span
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="flex items-center gap-1 bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded"
        >
          {{ tag.title }}
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
        class="absolute top-21 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="tag in filteredTags"
          :key="tag"
          @click="selectTag(tag)"
          class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
        >
          {{ tag.title }}
        </li>
      </ul>
  
      <!-- افزودن تگ جدید -->
      <div
        v-if="showDropdown && input && filteredTags.length === 0"
        class="absolute top-21 mt-1 w-full z-10 bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter برچسب "{{ input }}" را اضافه کن
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, computed, getCurrentInstance, onMounted } from 'vue'
  import store from '@/store/index.js'
  import _ from 'lodash';
  
  const input = ref('')
  const selectedTags = ref([])
  const showDropdown = ref(false)
  const { appContext } = getCurrentInstance()
  
  // برچسب‌های پیشنهادی از قبل
  
  onMounted(() => {
    // بارگذاری برچسب‌ها از سرور
    store.dispatch("getTagsList")
  })
  
  const tagSuggestions = computed(() => store.getters.getTagsList)
  // فیلتر پیشنهادات بر اساس ورودی
  const filteredTags = computed(() => {
    const keyword = input.value.toLowerCase()
    return tagSuggestions.value.filter(
      (tag) =>
        tag.title.toLowerCase().includes(keyword)
    )
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
  
  // افزودن تگ جدید
  const addTag = async () => {
    const trimmed = input.value.trim()
    const exists = selectedTags.value.find(
      (t) => t.title === input.value.trim()
    )
    if (!trimmed || exists) return

    if(!exists) {
      const newTag = { title: trimmed }

      if (!exists) {

        const result = await store.dispatch("saveTag", {title: input.value.trim()}).then(res => {
          show_alert({
            text: res.message,
            type: 'success',
          })


          selectTag(res.tag)

        }).catch(err => {
          show_alert({
            text: err.message,
            type: 'error',
          })
        })
      }

      input.value = ''
      showDropdown.value = false
    }
  
  }
  
  // انتخاب از لیست
  const selectTag = (tag) => {
    const exists = selectedTags.value.find(
      (t) => t.title === input.value.trim()
    )
    if (!exists) {
      selectedTags.value.push(tag)
    }

    input.value = ''
    showDropdown.value = false

    const ids = _.map(selectedTags.value , "id")
    store.dispatch('setProductTags', ids)
  }
  
  // حذف
  const removeTag = (index) => {
    selectedTags.value.splice(index, 1)

    const ids = _.map(selectedTags.value , "id")
    store.dispatch('setProductTags', ids)
  }
  </script>
  