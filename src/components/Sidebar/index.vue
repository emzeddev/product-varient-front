<template>
  <div class="space-y-4 font-fa">
    <Publish />
    <mainCategory />
    <SubCategories />
    <Brand />
    <AdditionalSpecifications />
    <Tags />
  </div>
</template>

<script setup>
import Publish from "./elements/Publish.vue";
import mainCategory from "./elements/mainCategory.vue";
import SubCategories from "./elements/SubCategories.vue";
import Brand from "./elements/Brand.vue";
import AdditionalSpecifications from "./elements/AdditionalSpecifications.vue";
import Tags from "./elements/Tags.vue";
</script>
