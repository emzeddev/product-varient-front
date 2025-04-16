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
        <!-- ویژگی -->
        <div class="col-span-6 relative">
          <input
            type="text"
            v-model="group.input"
            @input="group.showDropdown = true"
            @keydown.enter.prevent="handleEnterGroup(group)"
            @focus="group.showDropdown = true"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:ring-1 focus:ring-indigo-500"
            placeholder="جستجو یا افزودن ویژگی"
          />
          <ul
            v-if="group.showDropdown && filteredAttributesGroup(group).length > 0"
            class="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-60 overflow-y-auto text-sm text-gray-800"
          >
            <li
              v-for="(attr, idx) in filteredAttributesGroup(group)"
              :key="idx"
              @click="selectAttributeGroup(attr, group)"
              class="px-3 py-1 cursor-pointer hover:bg-indigo-100"
            >
              {{ attr }}
            </li>
          </ul>
          <div
            v-if="group.showDropdown && group.input && filteredAttributesGroup(group).length === 0"
            class="absolute z-10 top-full mt-1 w-full bg-white border border-gray-300 rounded shadow px-3 py-2 text-sm text-gray-600"
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
      </div>

      <!-- دکمه افزودن فرم جدید ویژگی -->
      <div class="my-4 flex items-center">
        <button
          @click="addAttributeGroup"
          class="text-sm text-indigo-600 flex items-center gap-1 mt-2"
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
              <th class="p-2 border">ویژگی</th>
              <th class="p-2 border">مقدار</th>
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
              <td class="p-2 border">{{ variant.name }}</td>
              <td class="p-2 border">{{ variant.value }}</td>
              <td class="p-2 border text-center">
                <input
                  type="radio"
                  name="default"
                  :value="index"
                  v-model="defaultVariant"
                />
              </td>
              <td class="p-2 border text-center">
                <div class="relative">
                  <label class="cursor-pointer">
                    <input
                      type="file"
                      class="hidden"
                      @change="onImageChange($event, index)"
                    />
                    <img
                      v-if="variant.image"
                      :src="variant.image"
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
                    @click="removeImage(index)"
                    class="absolute -top-1 -right-1 bg-white rounded-full border p-0.5 text-red-600"
                  >
                    <i class="ti ti-x"></i>
                  </button>
                </div>
              </td>
              <td class="p-2 border"><input v-model="variant.price" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.oldPrice" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.stock" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.weight" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.sku" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.prepTime" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.length" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.width" class="w-full border rounded px-2 py-1" /></td>
              <td class="p-2 border"><input v-model="variant.height" class="w-full border rounded px-2 py-1" /></td>
            </tr>
          </tbody>
        </table>

        <button @click="commitValues" class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          اعمال تغییرات
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const hasVariants = ref(true);
const predefinedAttributes = ref(["رنگ", "اندازه", "وزن", "جنس"]);
const defaultVariant = ref(null);
const variants = ref([]);

const attributeGroups = ref([
  {
    name: "",
    input: "",
    showDropdown: false,
    tempValue: "",
    values: [],
  },
]);

function addAttributeGroup() {
  attributeGroups.value.push({
    name: "",
    input: "",
    showDropdown: false,
    tempValue: "",
    values: [],
  });
}

function filteredAttributesGroup(group) {
  return predefinedAttributes.value.filter((attr) =>
    attr.toLowerCase().includes(group.input.toLowerCase())
  );
}

function selectAttributeGroup(attr, group) {
  group.name = attr;
  group.input = attr;
  group.showDropdown = false;
}

function handleEnterGroup(group) {
  if (!group.input.trim()) return;

  const exists = predefinedAttributes.value.find(
    (a) => a.toLowerCase() === group.input.toLowerCase()
  );
  if (!exists) {
    predefinedAttributes.value.push(group.input.trim());
  }
  group.name = group.input.trim();
  group.showDropdown = false;
}

function addValueAndCommit(group) {
  if (group.tempValue.trim()) {
    const val = group.tempValue.trim();
    group.values.push(val);
    variants.value.push({
      name: group.name,
      value: val,
      price: "",
      oldPrice: "",
      stock: "",
      weight: "",
      sku: "",
      prepTime: "",
      length: "",
      width: "",
      height: "",
      image: null,
    });
    group.tempValue = "";
  }
}

function commitValues() {
  attributeGroups.value.forEach((group) => {
    group.tempValue = "";
    group.values = [];
  });
}

function removeValue(group, index) {
  group.values.splice(index, 1);
}

function removeVariant(index) {
  variants.value.splice(index, 1);
}

function onImageChange(e, index) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      variants.value[index].image = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage(index) {
  variants.value[index].image = null;
}
</script>
