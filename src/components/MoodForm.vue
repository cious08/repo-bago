<template>
  <div class="mood-container">
    <div class="header">
      <h2>🌟 AI Wellness Advisor</h2>
      <p>Check in with your mood for AI-powered guidance.</p>
    </div>
    
    <div class="form-group">
      <input v-model="name" placeholder="Your full name" class="input-field" />
      <textarea v-model="mood" placeholder="How are you feeling today?" class="input-field"></textarea>
      
      <button @click="submitMood" :disabled="loading" class="submit-btn">
        <span v-if="!loading">Submit Mood Check-in</span>
        <div v-else class="spinner-container">
          <div class="spinner"></div>
          <span>🤖 AI is analyzing...</span>
        </div>
      </button>
    </div>

    <p v-if="errorMessage" class="error-banner">{{ errorMessage }}</p>

<div v-for="(entry, index) in history" :key="index" class="history-card">
  <strong class="history-name">{{ entry.full_name }}</strong>
  
  <div class="content-block">
    <p class="user-mood" v-html="entry.mood_text"></p>
  </div>

  <div class="history-reply">
    <span class="ai-label">AI:</span> {{ entry.ai_message }}
  </div>
</div>
   

    <div v-if="history.length > 0" class="history-section">
      <h3 class="history-title">📜 Recent History</h3>
      <div class="history-list">
        <div v-for="(entry, index) in history" :key="index" class="history-card">
          <strong class="history-name">{{ entry.full_name }}</strong>
          <p class="history-mood">"{{ entry.mood_text }}"</p>
          <div class="history-reply">
            <span class="ai-label">AI:</span> {{ entry.ai_message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return { name: '', mood: '', aiMessage: '', loading: false, errorMessage: '', history: [] };
  },
  async mounted() { this.fetchHistory(); },
  methods: {
    async fetchHistory() {
      try {
        const res = await api.get('/api/moods');
        this.history = res.data;
      } catch (err) { console.error("History fetch failed"); }
    },
    async submitMood() {
      this.errorMessage = '';
      this.aiMessage = '';
      if (!this.name.trim() || !this.mood.trim()) {
        this.errorMessage = "⚠️ Please fill in all fields.";
        return;
      }
      this.loading = true;
      try {
        const res = await api.post('/api/moods', { full_name: this.name, mood_text: this.mood });
        this.aiMessage = res.data.ai_message;
        await this.fetchHistory();
        this.mood = '';
      } catch (err) {
        this.errorMessage = "❌ Server Error. Is node running?";
      } finally { this.loading = false; }
    }
  }
};
</script>

<style scoped>
/* Main Container */
.mood-container { max-width: 500px; margin: 2rem auto; padding: 2rem; background: #ffffff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); color: #2d3748; }
.header h2 { color: #1a202c; margin-bottom: 0.5rem; }
.header p { color: #718096; margin-bottom: 1.5rem; }
.input-field { width: 100%; padding: 12px; margin-bottom: 1rem; border: 2px solid #edf2f7; border-radius: 10px; background: #f8fafc; color: #2d3748; }
.submit-btn { width: 100%; padding: 15px; background: #1a202c; color: #ffffff; border-radius: 10px; cursor: pointer; font-weight: bold; }
.ai-response-card { margin-top: 2rem; padding: 1.5rem; background: #f0fff4; border-left: 8px solid #48bb78; border-radius: 12px; }
.ai-text-content { color: #22543d; font-size: 1.1rem; font-weight: 600; margin: 0; }
.history-card { background: #f7fafc; padding: 1.2rem; border-radius: 12px; margin-bottom: 1rem; border: 1px solid #e2e8f0; }
</style>