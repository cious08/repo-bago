export async function getAIResponse(text) {
  try {
    const mood = text.toLowerCase();

    const insights = {
      sad: [
        "✨ It's okay to not be okay. Allow yourself to feel, then let it flow like water. 🌊",
        "✨ Your feelings are valid. Remember, even the darkest night ends with a sunrise. 🌅"
      ],
      happy: [
        "✨ Radiate that glow! Your joy is a gift to the world. Keep shining. 🌟",
        "✨ High vibrations only! Spread that positive energy around. 🌈"
      ],
      tired: [
        "✨ Rest is productive. Give your soul the quiet time it craves. ☁️",
        "✨ Pause. Breathe. Disconnect to reconnect with yourself. 🌿"
      ],
      angry: [
        "✨ Exhale the fire, inhale the peace. This moment will pass. 🌬️",
        "✨ Protect your peace. Don't let the storm outside disturb the calm inside. ⚓"
      ]
    };

    if (mood.includes("sad") || mood.includes("iyak") || mood.includes("lonely")) {
      return insights.sad[Math.floor(Math.random() * insights.sad.length)];
    } else if (mood.includes("happy") || mood.includes("saya") || mood.includes("excited")) {
      return insights.happy[Math.floor(Math.random() * insights.happy.length)];
    } else if (mood.includes("tired") || mood.includes("pagod") || mood.includes("exhausted")) {
      return insights.tired[Math.floor(Math.random() * insights.tired.length)];
    } else if (mood.includes("galit") || mood.includes("angry") || mood.includes("inis")) {
      return insights.angry[Math.floor(Math.random() * insights.angry.length)];
    } else {
      return "✨ Thank you for sharing. Remember to pause, breathe, and trust the process of your journey. 🕊️";
    }
  } catch (error) {
    return "✨ AI service is resting. Please take a deep breath and be kind to yourself. 🌿";
  }
}