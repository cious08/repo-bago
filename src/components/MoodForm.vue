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

    <transition name="pop">
      <div v-if="aiMessage" class="ai-response-card">
        <div class="card-tag">✨ Advisor Insight</div>
        <p class="ai-text-content">{{ aiMessage }}</p>
      </div>
    </transition>

    <div v-if="history.length > 0" class="history-section">
      <h3>📜 Recent History</h3>
      <div class="history-list">
        <div v-for="(entry, index) in history" :key="index" class="history-card">
          <strong>{{ entry.full_name }}</strong>
          <p>"{{ entry.mood_text }}"</p>
          <div class="history-reply"><b>AI:</b> {{ entry.ai_message }}</div>
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
      const res = await api.get('/api/moods');
      this.history = res.data;
    },
    async submitMood() {
  

      // --- PART 0.1: LOGGING SETUP ---
      console.log("User clicked submit button"); 
      console.log("Mood value entered:", this.mood);

      if (!this.name || !this.mood) {
        this.errorMessage = "⚠️ Please fill in all fields.";
        return;
      }
      this.loading = true;
      this.errorMessage = '';
      this.aiMessage = '';

      try {
        const [res] = await Promise.all([
          api.post('/api/moods', { full_name: this.name, mood_text: this.mood }),
          new Promise(resolve => setTimeout(resolve, 1500))
        ]);

        // --- PART 0.1: LOGGING STATUS ---
        console.log("API response status:", res.status);

        this.aiMessage = res.data.ai_message;
        await this.fetchHistory();
        this.mood = '';
      } catch (err) {
        console.error("Caught error:", err);
        this.errorMessage = "❌ Server Error. Is node running?";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.mood-container { max-width: 500px; margin: 2rem auto; padding: 2rem; background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); font-family: sans-serif; }
.input-field { width: 100%; padding: 12px; margin-bottom: 1rem; border: 2px solid #eee; border-radius: 10px; box-sizing: border-box; }
.submit-btn { width: 100%; padding: 15px; background: #1a1a1a; color: #fff; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; }
.spinner-container { display: flex; align-items: center; justify-content: center; gap: 10px; }
.spinner { width: 16px; height: 16px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #fff; border-radius: 50%; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.ai-response-card { margin-top: 2rem; padding: 1.5rem; background: #fff; border-left: 8px solid #42b883; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.15); border: 1px solid #eee; }
.ai-text-content { color: #1a1a1a; font-size: 1.2rem; font-weight: 700; }
.card-tag { color: #42b883; font-weight: 800; font-size: 0.8rem; margin-bottom: 5px; }
.history-card { background: #f9f9f9; padding: 1rem; border-radius: 10px; margin-top: 1rem; border: 1px solid #eee; }
.history-reply { color: #42b883; font-size: 0.9rem; margin-top: 5px; border-top: 1px solid #eee; padding-top: 5px; }
.error-banner { color: #e53e3e; background: #fff5f5; padding: 10px; border-radius: 8px; text-align: center; }
.pop-enter-active { transition: all 0.3s ease; }
.pop-enter-from { opacity: 0; transform: scale(0.9); }
</style>