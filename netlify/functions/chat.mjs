// Secure Netlify serverless function. Set OPENAI_API_KEY in Netlify environment variables.
const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'};
const reply=(status,obj)=>new Response(JSON.stringify(obj),{status,headers});
export default async function handler(request){
  if(request.method!=='POST')return reply(405,{error:'Only POST requests are accepted.'});
  let payload;try{payload=await request.json()}catch{return reply(400,{error:'Invalid JSON request.'})}
  const question=typeof payload?.question==='string'?payload.question.trim():'';
  if(!question||question.length>2000)return reply(400,{error:'Please enter a question of 1–2000 characters.'});
  const key=Netlify.env.get('OPENAI_API_KEY');
  if(!key)return reply(503,{error:'Ummah AI is not configured yet. The site administrator must set OPENAI_API_KEY in Netlify environment variables.'});
  try{
    const r=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({model:Netlify.env.get('OPENAI_MODEL')||'gpt-4o-mini',temperature:0.35,max_tokens:700,messages:[{role:'system',content:'You are Ummah AI, a respectful Islamic learning assistant for UmmahLight. Give clear, compassionate, accurate answers; distinguish Qur’an, authentic hadith, scholarly interpretation, and uncertainty. Never fabricate verse numbers or hadith references. When unsure, say so. For fatwas, marriage disputes, and other sensitive decisions, recommend consulting a qualified local scholar. Avoid sectarian hostility. Do not claim to be a mufti.'},{role:'user',content:question}]})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok){console.error('AI upstream error',r.status,data?.error?.type||'unknown');return reply(502,{error:r.status===401?'AI provider authentication failed. Please check the Netlify API key.':r.status===429?'AI provider rate or billing limit reached. Please try again later.':'AI service temporarily unavailable. Please try again.'})}
    const answer=data.choices?.[0]?.message?.content;
    if(typeof answer!=='string'||!answer.trim())return reply(502,{error:'The AI service returned no answer.'});
    return reply(200,{answer:answer.trim()});
  }catch(e){console.error('AI connection error',e?.message);return reply(502,{error:'Could not reach the AI service. Please try again.'})}
}
export const config={path:'/.netlify/functions/chat'};
