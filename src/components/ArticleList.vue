<script setup>
import ArticleCard from './ArticleCard.vue'
import data from '../data.json' 
</script>

<template>
    <div v-for="(article, index) in data" :key="index">
        <ArticleCard :title="article.Title" :excerpt="article.excerpt" :image="article.Image" :author="article.Author"
            :href="article.path" :date="article.Updated" />
    </div>
</template>