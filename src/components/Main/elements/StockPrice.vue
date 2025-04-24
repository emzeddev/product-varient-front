<template>
    <div class="flex flex-col gap-6 border border-gray-200 rounded-lg p-6">
      <h2 class="text-lg font-semibold text-gray-800">موجودی و قیمت</h2>
  
      <!-- نوع موجودی -->
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">موجودی:</label>
          <select 
          :value="stockStatus"
          @change="updateProductStockStatus($event.target.value)"
           class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="unlimited">نامحدود</option>
            <option value="limited">محدود</option>
            <option value="out_of_stock">ناموجود</option>
            <option value="call">تماس بگیرید</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
        </div>
  
        <div v-if="stockStatus === 'limited'" class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">تعداد موجودی:</label>
          <input
            :value="stock"
            @input="updateProductStock($event.target.value)"
            type="number"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
          />
        </div>
      </div>
  
      <!-- حداقل/حداکثر تعداد سفارش -->
      <div class="grid grid-cols-2 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">حداقل تعداد قابل سفارش:</label>
          <select 
           :value="minOrderType"
           @change="changeMinOrderType($event.target.value)" 
           class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="0">بدون محدودیت</option>
            <option value="1">تعیین تعداد</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
  
          <div v-if="minOrderType === '1'" class="mt-2">
            <input
              :value="min_order_quantity"
              @input="updateProductMinOrderQuantity($event.target.value)"
              type="number"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
            />
          </div>
        </div>
  
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">حداکثر تعداد قابل سفارش:</label>
          <select 
           :value="maxOrderType"
           @change="changeMaxOrderType($event.target.value)" 
           class="w-full appearance-none rounded border border-gray-300 pl-10 pr-3 py-2 text-sm text-gray-800">
            <option value="0">بدون محدودیت</option>
            <option value="1">تعیین تعداد</option>
          </select>
          <i class="absolute left-3 top-9 text-gray-500 pointer-events-none ti ti-chevron-down text-sm"></i>
  
          <div v-if="maxOrderType == '1'" class="mt-2">
            <input
              :value="max_order_quantity"
              @input="updateProductMaxOrderQuantity($event.target.value)"
              type="number"
              class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
            />
          </div>
        </div>
      </div>
  
      <!-- قیمت‌ها -->
      <div class="grid grid-cols-2 gap-4" v-if="hasVarient == false">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان):</label>
          <input
            :value="price"
            @input="updateProductPrice($event.target.value)"
            type="text"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">قیمت قبل از تخفیف (تومان):</label>
          <input
            :value="price_before_offer"
            @input="updateProductPriceBeforeOffer($event.target.value)"
            type="text"
            :disabled="!price"
            class="w-full rounded border border-gray-300 px-3 py-2 text-sm text-center text-gray-800 disabled:bg-gray-200 disabled:text-gray-500"
          />

          <p v-if="errorPriceBeforeOffer != null" class="text-red-500 text-xs mt-1">
            {{ errorPriceBeforeOffer }}
          </p>
        </div>
      </div>
  
      <!-- پیشنهاد ویژه -->
      <div class="flex items-center gap-3 mt-4">
        <input
          id="special_offer"
          type="checkbox"
          v-model="is_spacial_offer"
          @change="updateProductIsSpecialOffer($event.target.checked)"
          class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="special_offer" class="text-sm font-medium text-gray-700">پیشنهاد ویژه</label>
      </div>
  
      <!-- انتخاب تاریخ شمسی -->
      <div v-if="is_spacial_offer" class="mt-4">
        <label for="special_offer_end" class="block text-sm font-medium text-gray-700 mb-2">
          زمان پایان پیشنهاد ویژه:
        </label>
        <date-picker
          v-model="spacial_offer_date"
          format="YYYY-MM-DD HH:mm:ss"
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
  import { reactive, ref, computed, watch } from 'vue'
  import store from '@/store/index.js'
  import DatePicker from 'vue3-persian-datetime-picker'
  

  const stockTypes = ['unlimited', 'limited', 'out_of_stock', 'call']
  const minOrderType = ref('0')
  const maxOrderType = ref('0')
  const errorPriceBeforeOffer = ref(null)
  const spacial_offer_date = ref('')
  const hasVarient = computed(() => {
    return store.getters.getProductHasVariants
  })


  const stockStatus = computed(() => {
    return store.getters.getProductStockStatus
  })

  const stock = computed(() => {
    return store.getters.getProductStock
  })

  const min_order_quantity = computed(() => {
    return store.getters.getProductMinOrderQuantity
  })

  const max_order_quantity = computed(() => {
    return store.getters.getProductMaxOrderQuantity
  })

  const price = computed(() => {
    return store.getters.getProductPrice
  })

  const price_before_offer = computed(() => {
    return store.getters.getProductPriceBeforeOffer
  })

  const is_spacial_offer = computed(() => {
    return store.getters.getProductIsSpecialOffer
  })
  

  const updateProductStockStatus = (value) => {
    if(stockTypes.includes(value)) {
      store.dispatch('updateProductStockStatus', value)
    } else {
      store.dispatch('updateProductStockStatus', 'unlimited')
    }
  }

  const updateProductStock = (value) => {
    store.dispatch('updateProductStock', value)
  }

  const updateProductMinOrderQuantity = (value) => {
    if(value == 'unlimit') {
      store.dispatch('updateProductMinOrderQuantity', null)
    } else if(value == '') {
      store.dispatch('updateProductMinOrderQuantity', null)
    } else {
      store.dispatch('updateProductMinOrderQuantity', value)
    }
  }

  const updateProductMaxOrderQuantity = (value) => {
    if(value == 'unlimit') {
      store.dispatch('updateProductMaxOrderQuantity', null)
    } else if(value == '') {
      store.dispatch('updateProductMaxOrderQuantity', null)
    } else {
      store.dispatch('updateProductMaxOrderQuantity', value)
    }
  }

  const changeMinOrderType = (value) => {
    if(value == '0') {
      store.dispatch('updateProductMinOrderQuantity', null)
      minOrderType.value = 0
    } else if(value == '1') {
      minOrderType.value = value
    }
  }

  const changeMaxOrderType = (value) => {
    if(value == '0') {
      store.dispatch('updateProductMaxOrderQuantity', null)
      maxOrderType.value = 0
    } else if(value == '1') {
      maxOrderType.value = value
    }
  }

  const updateProductPrice = (value) => {
    store.dispatch('updateProductPrice', value)
  }

  const updateProductPriceBeforeOffer = async (value) => {
    const result  = await store.dispatch('updateProductPriceBeforeOffer', value)
      .then((result) => {
        errorPriceBeforeOffer.value = null
      }).catch((err) => {
        errorPriceBeforeOffer.value = err.message
      });
  }

  const updateProductIsSpecialOffer = (value) => {
    store.dispatch('updateProductIsSpecialOffer', value)
  }

  watch(spacial_offer_date, (newValue) => {
    store.dispatch('updateProductSpecialOfferDate', newValue)
  })

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
  