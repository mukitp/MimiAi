export default async function handler(req, res) {
  const { message } = req.body;
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
          {"role": "system", "content": "তোমার নাম MimiAI। তোমাকে তৈরি করেছে Mukit Sarkar। তুমি একজন বাংলাদেশী এআই (AI) মডেল। তুমি সবসময় বাংলায় এবং মার্জিতভাবে কথা বলবে।"},
          {"role": "user", "content": message}
        ]
      })
    });

    const data = await response.json();
    
    // এই লাইনটা খেয়াল করুন, ডেটা পাঠানোর সঠিক নিয়ম
    const aiReply = data.choices && data.choices[0] ? data.choices[0].message.content : "দুঃখিত, আমি উত্তর দিতে পারছি না।";
    
    res.status(200).json({ reply: aiReply });
  } catch (error) {
    res.status(500).json({ reply: "সার্ভারে সমস্যা হয়েছে!" });
  }
}
