<template>
    <div class="flex flex-col relative gap-2 w-full border p-4 rounded-lg border-gray-200">
      <label for="category" class="text-sm font-medium text-gray-700">دسته‌بندی اصلی:</label>

      <span 
        v-if="showDropdown && filteredCategories.length > 0"
        @click="showDropdown = false" 
        class="absolute top-[80px] left-[-20px] w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
        &times;
      </span>

      <input
        id="category"
        type="text"
        v-model="input"
        @input="showDropdown = true"
        @keydown.enter.prevent="handleEnter"
        autocomplete="off"
        @focus="showDropdown = true"
        class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500"
        placeholder="جستجو یا افزودن دسته‌بندی"
      />
  
      <!-- لیست دسته‌بندی‌ها -->
      <ul
        v-if="showDropdown && filteredCategories.length > 0"
        class="absolute z-10 top-20 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
      >
        <li
          v-for="(category , index) in filteredCategories"
          :key="`${category.id}-${index}`"
          @click="selectCategory(category)"
          class="px-3 py-1 cursor-pointer hover:bg-indigo-100"
        >
          {{ category.title }}
        </li>
      </ul>
  
      <!-- افزودن دسته جدید -->
      <div
        v-if="showDropdown && input && filteredCategories.length === 0"
        class="absolute z-10 top-20 mt-1 w-full bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
      >
        با Enter دسته "{{ input }}" را اضافه کن
      </div>
  
      <!-- نمایش دسته انتخاب‌شده -->
      <div v-if="selected" class="text-xs text-gray-500 mt-1">دسته انتخاب‌شده: {{ selected.title }}</div>
    </div>
</template>
  
  <script setup>
  import { ref, computed , onMounted ,getCurrentInstance , watchEffect } from 'vue'
  import store from '@/store/index.js'
  import debounce from 'lodash/debounce';

  const input = ref('')
  const showDropdown = ref(false)
  const selected = ref(null)
  const categories = computed(() => store.getters.getCategoriesList )
  const flatCategories = ref([]);
  const searchResult = ref([]);
  const { appContext } = getCurrentInstance()

  // [
  const getProductPrimaryCategory = computed(() => store.getters.getProductPrimaryCategory)

  const stop = watchEffect(() => {
    if (flatCategories.value.length > 0 && getProductPrimaryCategory.value) {
      const findCat = flatCategories.value.find(cat => cat.id === getProductPrimaryCategory.value)
      selectCategory({
        id: findCat.id,
        title: findCat.title,
        parent: findCat.parent_id == "0" ? null : findCat.parent_id
      })

      stop()
    }
  })
  // ]
  

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
          parent: parent
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
      cat.title.includes(query)
    );
  };
  
  const filteredCategories = computed(() => {
    let debounce_fun = debounce(function (query = input.value) {
      searchResult.value = searchCategories(query);
    }, 500);

    debounce_fun()
    return searchResult.value
  })

  
  // انتخاب از لیست
  function selectCategory(category) {
    selected.value = category
    input.value = category.title
    showDropdown.value = false
    store.dispatch('setProductCategoryId', category.id)
  }
  
  // افزودن دسته جدید
  const handleEnter = async () => {
    if (!input.value.trim()) return
  
    const exists = categories.value.find(
      (c) => c.title === input.value
    )
    if (!exists) {
      const newCategory = {
        title: input.value.trim(),
      }

      const result = await store.dispatch("saveCategory", newCategory).then(res => {
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

    } else {
      selected.value = exists
    }
  
    input.value = selected.value.title
    showDropdown.value = false
  }
  </script>
  