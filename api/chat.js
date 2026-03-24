export default async function handler(req, res) {
  // ১. ইউজার যে মেসেজ পাঠালো সেটা ধরবে
  const { message } = req.body;
  
  // ২. ভার্সেল ড্যাশবোর্ড থেকে আপনার API Key টা এখানে আসবে (নিরাপদ উপায়)
  const apiKey = process.env.OPENROUTER_API_KEY; 

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          {"role": "system", "content": "তোমার নাম MimiAI। তোমাকে তৈরি করেছে Mukit Sarkar। তুমি একজন বাংলাদেশী এআই (AI) মডেল। তুমি মার্জিত ভাষায় কথা বলবে।"},
          {"role": "user", "content": message}
        ]
      })
    });

    const data = await response.json();
    
    // এআই এর উত্তরটা ফ্রন্টএন্ডে পাঠিয়ে দিবে
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "API কল করতে সমস্যা হয়েছে!" });
  }
}
