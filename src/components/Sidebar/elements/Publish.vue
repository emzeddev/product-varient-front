<template>
    <div>
      <!-- محتوای اصلی در صورتی که isLoading = false باشد -->
      <div class="border border-gray-200 rounded-lg ltr:font-en mb-4">
        <div class="flex items-center justify-between border-b border-gray-200 p-4">
          <h5 class="text-lg font-semibold text-default-800">
            انتشار
          </h5>
        </div>
        <div class="p-4">
          <div class="flex flex-col space-y-2 items-center justify-center">
            <button
              class="bg-indigo-500 hover:bg-indigo-500/90 text-white font-semibold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out"
            >
              انتشار
            </button>
            <button
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out"
            >
              انتقال به پیش‌نویس‌ها
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  