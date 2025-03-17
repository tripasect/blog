<template>
  <div class="post-detail-container">
    <div v-if="loading" class="loading-state">
      <p>Loading article...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchArticle(slug)" class="retry-button">Try Again</button>
    </div>
    
    <article 
      v-else-if="article" 
      class="post-detail" 
      :dir="article.lang === 'fa' ? 'rtl' : 'ltr'"
      :lang="article.lang">
      
      <figure v-if="article.featuredImage" class="post-featured-image">
        <img 
          :src="article.featuredImage" 
          :alt="article.title"
          loading="eager"
          class="post-image">
      </figure>
      
      <div class="post-content-container">
        <blockquote v-if="article.kicker" class="post-kicker">
          {{ article.kicker }}
        </blockquote>
        
        <h1 class="post-title">{{ article.title }}</h1>
        
        <h2 v-if="article.subtitle" class="post-subtitle">
          {{ article.subtitle }}
        </h2>

        <h2 v-if="article.excerpt" class="post-excerpt">
          {{ article.excerpt }}
        </h2>
        
        <div class="post-content" v-html="renderedContent"></div>
      </div>
    </article>
    
    <div v-else class="not-found">
      <p>Article not found</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked' // Import the marked library

const route = useRoute()
const article = ref(null)
const error = ref(null)
const loading = ref(true)

// Compute the rendered HTML from Markdown content
const renderedContent = computed(() => {
  if (!article.value || !article.value.content) return '';
  
  // Convert Markdown to HTML using marked
  return marked(article.value.content);
})

const fetchArticle = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('/db.json'); // Fetch all posts from db.json
    if (!response.ok) throw new Error(`Failed to load posts: ${response.statusText}`);

    const data = await response.json();
    
    const foundPost = data.posts.find(post => post.slug === route.params.slug);
    if (!foundPost) throw new Error('Post not found');

    article.value = foundPost;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticle);
watch(() => route.params.slug, fetchArticle);
</script>

<style scoped>
.post-detail-container {
  max-width: 100%;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.loading-state, .error-state, .not-found {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #a2a9b1;
  border-radius: 2px;
  font-size: 0.875rem;
  cursor: pointer;
}

.retry-button:hover {
  background-color: #eaecf0;
}

.post-detail {
  margin: 0;
  padding: 0;
}

.post-featured-image {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 40vh;
  max-height: 40vh;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-content-container {
  padding: 1rem 1rem 2rem;
}

.post-kicker {
  font-style: italic;
  border-left: 3px solid var(--tg-theme-accent-text-color);
  background-color: var(--tg-theme-secondary-bg-color);
  border-radius: 2px;
  margin: 1rem 0;
  padding: 0.5rem 0 0.5rem 1rem;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.post-title {
  font-size: 1.5rem;
  line-height: 1.3;
  margin: 0.5rem 0;
  font-weight: bold;
}

.post-subtitle {
  font-size: 1.125rem;
  line-height: 1.4;
  margin: 0.5rem 0 1rem;
  font-weight: normal;
  opacity: 0.6;
}

.post-excerpt {
  padding-right: 10px;
  font-size: 1rem;
  line-height: 1;
  margin: 0.5rem 0 1.5rem;
  font-weight: normal;
  font-style: italic;
  opacity: 0.6;
}

.post-content {
  font-size: 1rem;
  line-height: 1.6;
}

.post-content h2 {
  font-size: 1.375rem;
  border-bottom: 1px solid #eaecf0;
  padding-bottom: 0.25rem;
  margin: 1.5rem 0 0.75rem;
}

.post-content h3 {
  font-size: 1.25rem;
  margin: 1.25rem 0 0.75rem;
}

.post-content p {
  margin: 0.75rem 0;
}

.post-content a {
  text-decoration: none;
}

.post-content a:hover {
  text-decoration: underline;
}

.post-content ul, .post-content ol {
  margin: 0.75rem 0;
  padding-left: 2rem;
}

.post-content li {
  margin-bottom: 0.25rem;
}

.post-content blockquote {
  border-left: 3px solid #c8ccd1;
  margin: 1rem 0;
  padding: 0.5rem 0 0.5rem 1rem;
  color: #54595d;
}

.post-content img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}

.post-content table {
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;
  font-size: 0.875rem;
}

.post-content th, .post-content td {
  border: 1px solid #c8ccd1;
  padding: 0.5rem;
}

.post-content th {
  background-color: #f8f9fa;
}

[dir="rtl"] .post-kicker {
  border-left: none;
  border-right: 3px solid var(--tg-theme-accent-text-color);
  padding: 0.5rem 1rem 0.5rem 0;
}

[dir="rtl"] .post-content blockquote {
  border-left: none;
  border-right: 3px solid var(--tg-theme-accent-text-color);
  padding: 0.5rem 1rem 0.5rem 0;
}


.stressed_word {
  font-weight: bold;
  color: var(--tg-theme-accent-text-color);
  border: 1px solid var(--tg-theme-secondary-bg-color);
  border-radius: 8px;
  
}
</style>