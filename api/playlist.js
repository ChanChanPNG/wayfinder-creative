// Vercel function: public playlist metadata only. Never expose YOUTUBE_API_KEY to visitors.
const COLLECTIONS=Object.freeze({
 business:'PLegHoeBAp60c',meta:'PLGKabkg-byRY',realestate:'PLOvb30AaH7vI',social:'PLOFtnDTnCizg',weddings:'PLfRz-zEbcP40'
});
module.exports=async function handler(req,res){
  res.setHeader('Cache-Control','public, s-maxage=900, stale-while-revalidate=3600');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});
  const category=String(req.query.category||'');
  if(!Object.prototype.hasOwnProperty.call(COLLECTIONS,category))return res.status(400).json({error:'Unknown playlist category'});
  const key=process.env.YOUTUBE_API_KEY;
  if(!key)return res.status(503).json({error:'YouTube connection is not configured yet.'});
  try{
    const items=[];let pageToken='';
    // Cap to 150 videos per category; increase if ever needed.
    for(let i=0;i<3;i++){
      const u=new URL('https://www.googleapis.com/youtube/v3/playlistItems');
      u.searchParams.set('part','snippet,contentDetails');u.searchParams.set('playlistId',COLLECTIONS[category]);u.searchParams.set('maxResults','50');u.searchParams.set('key',key);
      if(pageToken)u.searchParams.set('pageToken',pageToken);
      const upstream=await fetch(u,{headers:{'Accept':'application/json'}});
      const data=await upstream.json();
      if(!upstream.ok){console.error('YouTube playlist request failed',category,upstream.status,data.error?.message);return res.status(502).json({error:'This playlist could not be loaded. Check its ID and public visibility.'})}
      for(const it of data.items||[]){const id=it.contentDetails?.videoId||it.snippet?.resourceId?.videoId;const title=it.snippet?.title;if(/^[a-zA-Z0-9_-]{11}$/.test(id||'')&&title&&title!=='Private video'&&title!=='Deleted video')items.push({id,title})}
      pageToken=data.nextPageToken||'';if(!pageToken)break;
    }
    return res.status(200).json({category,items});
  }catch(error){console.error('YouTube connection error',error);return res.status(502).json({error:'YouTube is temporarily unavailable.'})}
};
