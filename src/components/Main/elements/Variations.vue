<template>
  <div class="space-y-4">
    <!-- عنوان و سوییچ تنوع -->
    <div class="flex items-center justify-between border p-4 rounded-lg border-gray-200">
      <span class="font-semibold text-gray-700">تنوع‌ها</span>
      <label class="flex items-center gap-2">
        <span class="text-sm"
          >این محصول دارای انواع مختلف مانند رنگ‌ها یا اندازه‌های متفاوت
          است.</span
        >
        <input
          type="checkbox"
          v-model="hasVariants"
          class="toggle toggle-primary"
        />
      </label>
    </div>

    <!-- ویژگی‌های اصلی -->
    <div v-if="hasVariants" class="border rounded-lg p-4 bg-white border-gray-200">
      <div class="mb-4">
        <p class="font-semibold text-gray-800">ویژگی‌های اصلی</p>
        <p class="text-xs text-gray-500 mt-1">
          با افزودن ویژگی، جدول تنوع‌ها به‌روز می‌شود.
        </p>
      </div>

      <!-- ریپیت فرم ویژگی و مقدار -->
      <div
        v-for="(group, index) in attributeGroups"
        :key="index"
        class="grid lg:grid-cols-12 gap-2 mb-3 repeater"
      >
        <!-- فیلد ویژگی با سرچ و افزودن -->
        <div class="col-span-5 relative">
        
        <span 
          v-if="group.showDropdown && filteredAttributesGroup(index).length > 0"
          @click="group.showDropdown = false" 
          class="absolute top-[40px] left-0 w-7 h-7 text-xl bg-red-500 text-bold rounded-full !z-[1000] flex items-center justify-center text-white cursor-pointer">
          &times;
        </span>

        <input
          v-model="group.input"
          @focus="group.showDropdown = true"
          @input="onFeatureInput(index)"
          @keydown.enter.prevent="handleEnterGroup(index)"
          type="text"
          placeholder="جستجوی ویژگی..."
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800"

        />
        <!-- لیست نتایج -->
        <ul
          v-if="group.showDropdown && filteredAttributesGroup(index).length > 0"
          class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 text-sm text-gray-800 max-h-48 overflow-y-auto"
        >
          <li
            v-for="feature in filteredAttributesGroup(index)"
            :key="feature.id"
            @click="selectAttributeGroup(index, feature.name)"
            class="px-3 py-1 hover:bg-indigo-100 cursor-pointer"
          >
            {{ feature.name }}
          </li>
        </ul>
        <!-- اگر موردی پیدا نشد -->
        <div
          v-if="group.showDropdown && group.input && filteredAttributesGroup(index).length === 0"
          class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 px-3 py-2 text-sm text-gray-600"
        >
          با Enter ویژگی "{{ group.input }}" را اضافه کن
        </div>
      </div>

        <!-- مقدار -->
        <div class="col-span-6">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(val, i) in group.values"
              :key="i"
              class="bg-gray-100 rounded px-2 py-1 text-sm flex items-center"
            >
              {{ val }}
              <button @click="removeValue(group, i)" class="ml-1 text-red-500">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <input
              v-model="group.tempValue"
              @keydown.enter.prevent="addValueAndCommit(group)"
              placeholder="مقدار (مثلاً قرمز)"
              class="flex-1 min-w-[120px] border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div @click="removeProductAttributeGroup(index)" 
        class="flex items-center justify-center col-span-1 border rounded-lg cursor-pointer" >
          
          <button
            @click="removeProductAttributeGroup(index)"
            class="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>

      <!-- دکمه افزودن فرم جدید ویژگی -->
      <div class="my-4 flex items-center">
        <button
          @click="addAttributeGroup"
          class="mt-4 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 cursor-pointer"
        >
          <i class="ti ti-plus"></i> افزودن ویژگی
        </button>
      </div>

      <!-- جدول تنوع‌ها -->
      <div class="overflow-auto">
        <table class="min-w-full text-sm border">
          <thead class="bg-gray-100 text-gray-600">
            <tr>
              <th class="p-2 border">حذف</th>
              <th class="p-2 border w-[100px]">ویژگی</th>
              <th class="p-2 border">پیش‌فرض</th>
              <th class="p-2 border">تصویر</th>
              <th class="p-2 border">قیمت (تومان)</th>
              <th class="p-2 border">قیمت قبل از تخفیف</th>
              <th class="p-2 border">موجودی</th>
              <th class="p-2 border">وزن (گرم)</th>
              <th class="p-2 border">شناسه کالا</th>
              <th class="p-2 border">زمان آماده‌سازی (روز)</th>
              <th class="p-2 border">طول (سانتی‌متر)</th>
              <th class="p-2 border">عرض (سانتی‌متر)</th>
              <th class="p-2 border">ارتفاع (سانتی‌متر)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(variant, index) in variants" :key="index">
              <td class="p-2 border text-center">
                <button
                  @click="removeVariant(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <i class="ti ti-trash"></i>
                </button>
              </td>
              <td class="p-2 border">
                <ul v-if="variant.sku.split('-').length != 0">
                   <li v-for="(attribute, index) in variant.sku.split('-')" :key="index" class="text-sm text-gray-700">
                    - {{ attribute }}
                   </li>
                </ul>
              </td>
              <td class="p-2 border text-center">
                <input
                  type="radio"
                  name="default"
                  :value="index"
                  v-model="variant.is_default"
                />
              </td>
              <td class="p-2 border text-center">
                <div class="relative">
                    <label class="cursor-pointer">
                    <input
                      type="file"
                      class="hidden"
                      ref="fileInput"
                      accept="image/*"
                      @change="onImageChange($event, index)"
                    />
                    <img
                      v-if="variant.localimage"
                      :src="variant.localimage"
                      class="w-10 h-10 object-cover rounded-full inline-block"
                    />
                    <div
                      v-else
                      class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full"
                    >
                      <i class="ti ti-camera text-gray-500"></i>
                    </div>
                    </label>
                    <button
                    v-if="variant.image"
                    @click="() => { removeImage(index); $refs.fileInput[index].value = null; }"
                    class="absolute -top-1 -right-1 bg-white rounded-full border p-0.5 text-red-600"
                    >
                    <i class="ti ti-x"></i>
                    </button>
                </div>
              </td>
              <td class="p-2 border"><input v-model="variant.price" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.price_before_discount" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.stock" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.weight" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input disabled v-model="variant.sku_number" class="w-full border rounded px-2 py-1 disabled:bg-gray-200 disabled:text-gray-500" /></td>
              <td class="p-2 border"><input v-model="variant.preparation_time" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.length" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.width" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.height" class="w-full border rounded px-2 py-1" /></td>
            </tr>
          </tbody>
        </table>

        <!-- <button @click="commitValues" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          اعمال تغییرات
        </button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from "vue";
import store from "@/store/index.js";

const hasVariants = computed({
  get: () => store.getters.getProductHasVariants,
  set: (value) => {
    store.dispatch("updateProductHasVariants", value);
  },
});
const predefinedAttributes = computed(() => store.getters.getAttributeList);
const variants = computed(() => store.getters.getProductVariants);
const { appContext } = getCurrentInstance()

watch(hasVariants, (newValue) => {
  if (newValue == false) {
    store.dispatch("clearVariants")
  } 
});

const attributeGroups = computed(() => {
  return store.getters.getProductAttributeGroups;
});

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

// هنگام تایپ
const onFeatureInput =(index) => {
  attributeGroups.value[index].feature = ''
  attributeGroups.value[index].showDropdown = true
}

const generateVariants = () => {
  const valueArrays = attributeGroups.value.map(attr => attr.values)

  const cartesian = (arr) => {
    const filtered = arr.filter(subArr => Array.isArray(subArr) && subArr.length > 0)

    
    if (filtered.length === 0) return []
    
    if (filtered.length === 1) return filtered[0].map(item => [item])
    console.log(filtered);

    return filtered.reduce((a, b) => {
      return a.flatMap(d => b.map(e => [...d, e]))
    }, [[]])
  }

  const result = cartesian(valueArrays)


  const variantArray = result.map(combination => {
    const variant = {}
    attributeGroups.value.forEach((attr, i) => {
      variant[attr.feature] = combination[i]
    })
    return {
      properties: variant,
      sku: combination.join('-'),
      is_default: false,
      localimage: null,
      image: null,
      price: 0,
      price_before_discount: 0,
      stock: 0,
      weight: 0,
      preparation_time: 0,
      sku_number: Math.floor(1000000 + Math.random() * 9000000),
      length: null,
      width: null,
      height: null,
    }
  })

  store.dispatch("updateProductVariants", variantArray)
}

const addAttributeGroup = () => {
  store.dispatch("addProductAttributeGroup", {
    feature: "",
    input: "",
    values: [],
    tempValue: "",
    showDropdown: false,
  });
}

const filteredAttributesGroup = (index) => {
  const keyword = attributeGroups.value[index].input?.toLowerCase() || ''
  return predefinedAttributes.value.filter((f) => f.name.toLowerCase().includes(keyword))
}

const removeProductAttributeGroup = (index) => {
  store.dispatch("removeProductAttributeGroup", index)
  generateVariants()
}

const selectAttributeGroup = (index, name) => {
  attributeGroups.value[index].feature = name;
  attributeGroups.value[index].input = name;
  attributeGroups.value[index].showDropdown = false;
}

const handleEnterGroup = async (index) => {
  if(filteredAttributesGroup(index).length === 0) {
    const input = attributeGroups.value[index].input.trim()
    if (input) {
      const result = await store.dispatch("saveAttribute", input).then(res => {
        predefinedAttributes.value.unshift({name: input})
        show_alert({
          text: res.message,
          type: 'success',
        })

        attributeGroups.value[index].feature = input
        attributeGroups.value[index].showDropdown = false
      }).catch(err => {
        show_alert({
          text: err.message,
          type: 'error',
        })
      })
    }
  }
}

const addValueAndCommit = (group) => {
  if (group.tempValue.trim()) {
    const val = group.tempValue.trim();
    group.values.push(val);
    generateVariants()
    group.tempValue = "";
  }
}

const commitValues = () => {
  attributeGroups.value.forEach((group) => {
    group.tempValue = "";
    group.values = [];
  });
}

const removeValue = (group, index) => {
  group.values.splice(index, 1);
  generateVariants()
}

const removeVariant = (index) => {
  store.dispatch("removeProductVariants", index);
}

const onImageChange = (e, index) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      variants.value[index].localimage = event.target.result;
      variants.value[index].image = file;
    };
    reader.readAsDataURL(file);
  }
}

const removeImage = (index) => {
  variants.value[index].localimage = null;
  variants.value[index].image = null;
}
</script>
