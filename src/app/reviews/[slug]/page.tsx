"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function ReviewDetailPage() {
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
  const rev = data.reviews.find(r => slugify(r.name) === slug);

  if (loading) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-black font-poppins"><div className="animate-pulse font-bold text-xl">Loading Story...</div></div>;
  if (!rev) return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-zinc-900 mb-4">Story Not Found</h1>
      <Link href="/reviews" className="text-indigo-600 font-bold hover:underline">Return to Community Stories</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-4xl mx-auto">
        <Link href="/reviews" className="text-indigo-600 font-bold mb-12 inline-block hover:-translate-x-1 transition-transform">← Back to Stories</Link>
        
        <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-2xl border border-zinc-100 relative">
          <span className="text-9xl text-indigo-50 font-serif absolute top-4 left-8">"</span>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-xl flex items-center justify-center text-white font-bold text-3xl mb-8">
               {rev.name.charAt(0).toUpperCase()}
            </div>
            
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">{rev.name}</h1>
            <p className="text-lg text-indigo-600 font-semibold uppercase tracking-widest mb-12">{rev.role}</p>
            
            <p className="text-2xl md:text-4xl text-zinc-800 leading-relaxed font-light italic mb-16 whitespace-pre-line">
              "{rev.text}"
            </p>
            
            <Link href="/#contact" className="px-10 py-5 bg-zinc-900 text-white rounded-full font-bold shadow-xl hover:bg-zinc-800 hover:-translate-y-1 transition-all">
              Write your own story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
