"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function PodcastDetailPage() {
  const params = useParams();
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCmsData().then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const slug = params?.slug as string;
  const pod = data.podcasts.find(p => slugify(p.title) === slug);

  if (loading) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-black font-poppins"><div className="animate-pulse font-bold text-xl">Loading Podcast...</div></div>;
  if (!pod) return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-zinc-900 mb-4">Episode Not Found</h1>
      <Link href="/podcasts" className="text-indigo-600 font-bold hover:underline">Return to Podcasts Directory</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-4xl mx-auto">
        <Link href="/podcasts" className="text-indigo-600 font-bold mb-8 inline-block hover:-translate-x-1 transition-transform">← Back to All Episodes</Link>
        
        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-zinc-100 flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
          
          <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-3xl overflow-hidden shadow-2xl shrink-0">
             <Image src={pod.image} alt={pod.title} fill className="object-cover" />
          </div>
          
          <div className="flex-1 mt-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-4 bg-indigo-100 text-indigo-700">
               {pod.dur} • Audio Experience
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight mb-4">{pod.title}</h1>
            <p className="text-2xl text-zinc-500 font-light mb-8">Featuring <span className="font-bold text-zinc-800">{pod.guest}</span></p>
            
            <button className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-600/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Play Full Episode
            </button>
            
            <p className="mt-8 text-zinc-400 text-sm leading-relaxed">
              Listen to the complete audio experience on Spotify, Apple Podcasts, or wherever you get your digital content. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
