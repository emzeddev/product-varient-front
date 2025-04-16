<template>
  <div class="space-y-4 font-fa">
    <Title />
    <StockPrice />
    <Images />
    <Features/>
    <Description/>
    <Variations/>
    <Review/>
    <Seo/>
  </div>
</template>

<script setup>
import Title from "./elements/Title.vue";
import StockPrice from "./elements/StockPrice.vue";
import Images from "./elements/Images.vue";
import Features from "./elements/Features.vue";
import Description from "./elements/Description.vue";
import Variations from "./elements/Variations.vue";
import Review from "./elements/Review.vue";
import Seo from "./elements/Seo.vue";
</script>
