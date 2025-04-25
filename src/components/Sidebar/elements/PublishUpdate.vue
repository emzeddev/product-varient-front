<template>
    <div>
      <!-- محتوای اصلی در صورتی که isLoading = false باشد -->
      <div class="border border-gray-200 rounded-lg ltr:font-en mb-4">
        <div  class="flex items-center justify-between border-b border-gray-200 p-4">
          <h5 class="text-lg font-semibold text-default-800">
            بروزرسانی
          </h5>
        </div>
        <div class="p-4">
          <div class="flex flex-col space-y-2 items-center justify-center">
            <button
             @click="saveProduct(false)"
              class="bg-indigo-500  cursor-pointer  hover:bg-indigo-500/90 text-white font-semibold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out"
            >
            بروزرسانی
            </button>
            <button
              @click="saveProduct(true)"
              class="bg-red-200 cursor-pointer hover:bg-red-300 text-red-800 font-semibold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out"
            >
              حذف محصول
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { ref, computed, getCurrentInstance } from 'vue'
  import store from '@/store/index.js'

  const { appContext } = getCurrentInstance()

  const saveProduct = async (isDraft = false) => {
    const {$toast} = appContext.config.globalProperties;
    const toastId = $toast.loading("در حال پیش نویس کردن. لطفا شکیبا باشید ...", {
      position: "bottom-left",
      toastClassName: "toast-pending",
    });



    try {
      const result = await store.dispatch("saveProduct" , {isDraft: isDraft})


      $toast.update(toastId, {
        render: isDraft == true ? "محصول با موفقیت به پیش نویس ها انتقال یافت👌" : "  اطلاعات محصول با موفقیت ثبت شد 👌",
        type: "success",
        isLoading: false,
        toastClassName: "toast-success",
        autoClose: 2000
      });
    } catch (err) {
      $toast.update(toastId, {
        render: err.message,
        type: "error",
        isLoading: false,
        toastClassName: "toast-error",
        autoClose: 5000
      });
    }
  };


</script>

<style>
.toast-pending {
  background-color: #ffaa01!important;
  color: #ffffff!important;
  border-right: 5px solid #fdf143!important;
  font-weight: bold!important;
  direction: rtl !important;
  text-align: right !important;
}

.toast-success, .toast-error {
  direction: rtl !important;
  text-align: right !important;
}
</style>
  