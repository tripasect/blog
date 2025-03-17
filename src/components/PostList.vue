<template>
    <div class="post-grid-container">
      <div v-if="loading" class="loading-state">
        <p>Loading articles...</p>
      </div>
      
      <div v-else-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchPosts" class="retry-button">Try Again</button>
      </div>
      
      <div v-else class="post-grid">
        <router-link 
          v-for="post in posts" 
          :key="post.id" 
          :to="{ name: 'PostDetail', params: { slug: post.slug }}" 
          class="post-box"
          :lang="post.lang"
        >
          <h3 class="post-title">{{ post.title }}</h3>
        </router-link>
        
        <div v-if="posts.length === 0" class="no-posts">
          <p>No articles found</p>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref, onMounted } from 'vue'
    
  const posts = ref([])
  const loading = ref(true)
  const error = ref(null)
    
  // Fetch posts from db.json
  const fetchPosts = async () => {
    loading.value = true
    error.value = null
  
    try {
      const response = await fetch('/db.json')
      if (!response.ok) throw new Error(`Failed to load posts: ${response.statusText}`)
  
      const data = await response.json()
      posts.value = data.posts.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
    } catch (err) {
      console.error('Error fetching posts:', err)
      error.value = 'Unable to load articles. Please try again later.'
    } finally {
      loading.value = false
    }
  }
  
  // Lifecycle hooks
  onMounted(fetchPosts)
  </script>
  
  <style scoped>
  .post-grid-container {
    max-width: 100%;
    padding: 1rem;
  }
  
  .loading-state, .error-state, .no-posts {
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
  
  .post-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 1rem;
  }
  
  .post-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    text-decoration: none;
    transition: all 0.2s ease;
    text-align: center;
  }
  
  .post-box:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .post-title {
    font-size: 0.75rem;
    line-height: 1.2;
    margin: 0;
    font-weight: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  </style>