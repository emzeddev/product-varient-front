<template>
    <div class="rounded-lg border border-gray-200 p-4 bg-white">
      <h3 class="text-sm font-semibold text-gray-800 mb-4">توضیحات</h3>
  
      <div v-if="isEditorReady">
        <Editor
          :key="editorKey"
          tinymce-script-src="/tinymce/tinymce.min.js"
          v-model="description"
          :init="editorConfig"
          class="custom-editor bg-white"
        />
      </div>
  
    </div>
</template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import store from '@/store/index.js'
  import Editor from '@tinymce/tinymce-vue'
  


  const isEditorReady = ref(false)
  const editorKey = ref(0)

  const description = computed({
    get: () => store.getters.getProductDescription,
    set: (value) => {
      store.dispatch('updateProductDescription', value)
    },
  })
  

  const loadTinyMCEScript = () => {
    return new Promise((resolve, reject) => {
      if (!window.tinymce) {
        const script = document.createElement('script')
        script.src = '/tinymce/tinymce.min.js'
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      } else {
        resolve()
      }
    })
  }

  
  onMounted(async () => {
    setTimeout(async() => {
      await loadTinyMCEScript()
      isEditorReady.value = true
    }, 500);
  })
  
  const editorConfig = {
    height: 300,
    menubar: false,
    directionality: 'rtl',
    language: 'fa',
    language_url: '/tinymce/langs/fa.js',
    plugins: 'link image lists table code fullscreen',
    toolbar:
      'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | table | link | image | fullscreen',
    content_style:
      'body { font-family: Vazirmatn, sans-serif; font-size: 14px; direction: rtl; text-align: right; }',
    branding: false,
    statusbar: false,
    automatic_uploads: true,
    images_upload_handler: async (blobInfo, success, failure) => {
      try {
        const formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())
  
        const response = await fetch('http://localhost:8000/api/v1/tiny', {
          method: 'POST',
          body: formData,
        })
  
        const result = await response.json()
        // console.log(result)
        if (response.ok && result?.location) {
          success(result.location)
        } else {
          failure('خطا در دریافت آدرس عکس از سرور.')
        }
      } catch (err) {
        failure('خطا در ارسال عکس به سرور.')
      }
    },
  }
  
  const saveDescription = async () => {
    try {
      const response = await fetch('/api/save-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: description.value }),
      })
  
      const result = await response.json()
      if (result.success) {
        alert('✅ توضیحات با موفقیت ذخیره شد.')
      } else {
        alert('❌ ذخیره ناموفق بود.')
      }
    } catch (err) {
      alert('⚠️ خطا در ارتباط با سرور.')
    }
  }
  </script>
  
  <style scoped>
  .custom-editor {
    max-width: 100%;
  }
  </style>
  