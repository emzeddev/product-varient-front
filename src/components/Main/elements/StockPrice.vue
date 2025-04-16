<template>
    <div class="flex flex-col gap-6 border border-gray-200 rounded-lg p-6">
      <h2 class="text-lg font-semibold text-gray-800">موجودی و قیمت</h2>
  
      <!-- نوع موجودی -->
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">موجودی:</label>
          <select v-model="stockType" class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="unlimited">نامحدود</option>
            <option value="limited">محدود</option>
            <option value="out_of_stock">ناموجود</option>
            <option value="call">تماس بگیرید</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
        </div>
  
        <div v-if="stockType === 'limited'">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد موجودی:</label>
          <input
            v-model="form.stock"
            type="number"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
          />
        </div>
      </div>
  
      <!-- حداقل/حداکثر تعداد سفارش -->
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">حداقل تعداد قابل سفارش:</label>
          <select v-model="minOrderType" class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="0">بدون محدودیت</option>
            <option value="1">تعیین تعداد</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
  
          <div v-if="minOrderType === '1'" class="mt-2">
            <input
              v-model="form.min_order_quantity"
              type="number"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
            />
          </div>
        </div>
  
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">حداکثر تعداد قابل سفارش:</label>
          <select v-model="maxOrderType" class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="0">بدون محدودیت</option>
            <option value="1">تعیین تعداد</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
  
          <div v-if="maxOrderType === '1'" class="mt-2">
            <input
              v-model="form.max_order_quantity"
              type="number"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
            />
          </div>
        </div>
      </div>
  
      <!-- قیمت‌ها -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان):</label>
          <input
            v-model="form.price"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">قیمت قبل از تخفیف (تومان):</label>
          <input
            v-model="form.compare_at_price"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
          />
        </div>
      </div>
  
      <!-- پیشنهاد ویژه -->
      <div class="flex items-center gap-3 mt-4">
        <input
          id="special_offer"
          type="checkbox"
          v-model="form.special_offer"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="special_offer" class="text-sm font-medium text-gray-700">پیشنهاد ویژه</label>
      </div>
  
      <!-- انتخاب تاریخ شمسی -->
      <div v-if="form.special_offer" class="mt-4">
        <label for="special_offer_end" class="block text-sm font-medium text-gray-700 mb-2">
          زمان پایان پیشنهاد ویژه:
        </label>
        <date-picker
          v-model="form.special_offer_end"
          format="YYYY/MM/DD HH:mm"
          display-format="jYYYY/jMM/jDD HH:mm"
          :enable-time-picker="true"
          type="datetime"
          auto-submit
          class="w-full text-sm text-center  px-3 py-2 text-gray-800"
        />
        <p class="mt-2 text-xs text-gray-500">
          برای محصولات مجازی، اطلاعات ارسال دریافت نمی‌شود.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import DatePicker from 'vue3-persian-datetime-picker'
  
  const stockType = ref('unlimited')
  const minOrderType = ref('0')
  const maxOrderType = ref('0')
  
  const form = reactive({
    stock: '',
    min_order_quantity: '',
    max_order_quantity: '',
    price: '',
    compare_at_price: '',
    special_offer: false,
    special_offer_end: ''
  })
  </script>
  
  <script>
  export default {
    components: {
      DatePicker
    }
  }
  </script>

  <style>
.vpd-input-group input {
    border-top-left-radius: 5px !important;
    border-bottom-left-radius: 5px !important;


}

.vpd-icon-btn {
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
}
</style>
  