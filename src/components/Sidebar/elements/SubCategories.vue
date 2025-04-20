<template>
     <div class="flex flex-col gap-2 relative w-full border p-4 rounded-lg border-gray-200">
      <label class="text-sm font-medium text-gray-700">سایر دسته‌بندی‌ها:</label>

      <span 
        v-if="showDropdown && filteredCategories.length > 0"
        @click="showDropdown = false" 
        class="absolute top-[80px] left-[-15px] w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
        &times;
      </span>
  
      <!-- لیست دسته‌های انتخاب‌شده -->
      <div class="flex flex-wrap gap-2 border border-gray-300 rounded p-2 min-h-[42px]">
        <span
          v-for="(category, index) in selectedCategories"
          :key="category.id"
          class="flex items-center gap-1 bg-gray-500 text-white text-sm px-2 py-1 rounded"
        >
          {{ category.title }}
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
      <!-- لیست دسته‌بندی‌ها -->
      <ul
        v-if="showDropdown && filteredCategories.length > 0"
        class="absolute z-10 top-20 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="category in filteredCategories"
          :key="category.id"
          @click="selectCategory(category)"
          class="px-3 py-1 cursor-pointer hover:bg-indigo-100"
        >
          {{ category.title }}
        </li>
      </ul>
  
      <!-- گزینه افزودن جدید -->
      <div
        v-if="showDropdown && input && filteredCategories.length === 0"
        class="absolute z-10 top-20 mt-1 w-full bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter دسته "{{ input }}" را اضافه کن
      </div>
    </div>
</template>
  
<script setup>
  import { ref, computed, onMounted, getCurrentInstance } from 'vue'
  import store from '@/store/index.js'
  import debounce from 'lodash/debounce';
  import _ from 'lodash';
  
  const input = ref('')
  const showDropdown = ref(false)
  const selectedCategories = ref([])
  const flatCategories = ref([]);
  const searchResult = ref([]);
  const { appContext } = getCurrentInstance()
  
  // دسته‌های موجود
  const categories = computed(() => store.getters.getCategoriesList )

  onMounted(async () => {
    await store.dispatch('getCategoriesList')
    flatCategories.value = flattenCategories(categories.value)
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

  const flattenCategories = (categories) => {
    const result = [];

    const flatten = (items, parent = null) => {
      for (const item of items) {
        result.push({
          id: item.id,
          title: item.title,
          parent: parent,
        });
        if (item.childs && item.childs.length > 0) {
          flatten(item.childs, item.id);
        }
      }
    };

    flatten(categories);
    return result;
  };

  const searchCategories = (query) => {
    return flatCategories.value.filter(cat =>
      cat.title.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  // خروجی فیلترشده برای پیشنهادها
  const filteredCategories = computed(() => {
    let debounce_fun = debounce(function (query = input.value) {
      searchResult.value = searchCategories(query);
    }, 500);

    debounce_fun()
    return searchResult.value
  })
  
  // انتخاب از لیست
  const selectCategory = (cat) => {
    selectedCategories.value.push(cat)
    input.value = ''
    showDropdown.value = false

    const ids = _.map(selectedCategories.value , "id")
    store.dispatch('setProductOtherCategoryIds', ids)
  }
  
  // حذف از لیست انتخاب‌شده
  function removeCategory(index) {
    selectedCategories.value.splice(index, 1)
    const ids = _.map(selectedCategories.value , "id")
    store.dispatch('setProductOtherCategoryIds', ids)
  }
  
  // افزودن دسته جدید
  const addCategory = async () => {
    const trimmed = input.value.trim()
    if (!trimmed) return
  
    const exists = categories.value.find((c) => c.title === trimmed)
  
    if (!exists) {
      const newCat = { title: trimmed }
      categories.value.push(newCat)

      const result = await store.dispatch("saveCategory", newCat).then(res => {
        show_alert({
          text: res.message,
          type: 'success',
        })

        // console.log();
        store.dispatch('updateCategoriesList', res.category)
        selectCategory(res.category)

        flatCategories.value = flattenCategories(categories.value)

      }).catch(err => {
        show_alert({
          text: err.message,
          type: 'error',
        })
      })


      
    }else {
      selectCategory(exists)
    } 
  
    input.value = ''
    showDropdown.value = false
  }


  </script>
  