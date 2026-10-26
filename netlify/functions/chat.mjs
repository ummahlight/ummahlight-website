const SYSTEM = `You are Chat with Islam, a careful, compassionate Islamic educational assistant for Worldwide Islamic Prayer Family Foundation. Answer respectfully, clearly, and with nuance. When possible cite Quran surah and ayah or reliably known hadith collections, but NEVER invent quotations, hadith numbers or references. Distinguish established teachings from scholarly disagreement and mention differences among recognized schools where relevant. Avoid sectarian attacks. For fatwas, divorce, abuse, financial rulings, mental health crises or complex personal circumstances, encourage consultation with a qualified local scholar or appropriate professional. Do not pretend to be the founder or promise confidentiality. Respond in the user's language when possible. No personalized medical diagnoses. In immediate danger encourage local emergency help. Be warm, useful and concise unless asked for depth.`;
export default async (request) => {
  if(request.method!== 'POST') return new Response(JSON.stringify({error:'Method not allowed'}),{status:405});
  try {
    const {messages}=await request.json();
    if(!Array.isArray(messages)||messages.length>24||messages.some(m=>!['user','assistant'].includes(m.role)||typeof m.content!=='string'||m.content.length>4000)) return Response.json({error:'Invalid chat input'},{status:400});
    const key=process.env.OPENAI_API_KEY;
    if(!key) return Response.json({error:'AI chat is not configured yet. Add OPENAI_API_KEY to Netlify environment variables and redeploy.'},{status:503});
    const upstream=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4.1-mini',messages:[{role:'system',content:SYSTEM},...messages],max_tokens:1100,temperature:0.4})});
    const data=await upstream.json();
    if(!upstream.ok) return Response.json({error:'The assistant is temporarily unavailable. Please try again.'},{status:502});
    return Response.json({reply:data.choices?.[0]?.message?.content||'Please try asking again.'});
  } catch {return Response.json({error:'Unable to process your request.'},{status:500});}
};
