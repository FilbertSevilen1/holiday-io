"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function GroupDetailPage() {
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
  const group = data.groups.find(g => slugify(g.loc) === slug);

  if (loading) return <div className="min-h-screen bg-zinc-50 flex items-center justify-center text-black font-poppins"><div className="animate-pulse font-bold text-xl">Loading Community...</div></div>;
  
  if (!group) return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-zinc-900 mb-4">Community Not Found</h1>
      <Link href="/groups" className="text-indigo-600 font-bold hover:underline">Return to Groups Directory</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-4xl mx-auto relative">
        <Link href="/groups" className="text-indigo-600 font-bold mb-8 inline-block hover:-translate-x-1 transition-transform">← Back to All Communities</Link>
        
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-zinc-100 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${group.color || "from-blue-500 to-indigo-600"}`} />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase mb-4 bg-gradient-to-r ${group.color || "from-blue-500 to-indigo-600"} text-white`}>
                {group.type}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight">{group.loc} Community</h1>
            </div>
            
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 flex items-center justify-center text-center">
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Meeting Time</p>
                <p className="text-xl font-bold text-indigo-600">{group.time}</p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg text-zinc-600 max-w-none mt-8">
            <h3 className="text-2xl font-bold text-zinc-800 mb-4">About this gathering</h3>
            <p className="leading-relaxed whitespace-pre-line text-xl font-light">{group.desc}</p>
          </div>
          
          <div className="mt-16 pt-12 border-t border-zinc-100 flex flex-col sm:flex-row gap-6">
            <Link href="/#contact" className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-center hover:bg-indigo-700 transition-colors shadow-lg active:scale-95 flex-1">
              Join this Community
            </Link>
            <Link href="/#events" className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-full font-bold text-center hover:bg-zinc-50 transition-colors shadow-sm flex-1">
              Explore Timeline
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
