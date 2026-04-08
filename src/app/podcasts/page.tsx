"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function PodcastsSearchPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCmsData().then(d => setData(d));
  }, []);

  const filtered = useMemo(() => {
    return data.podcasts.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.guest.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.podcasts, search]);

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-indigo-600 font-bold mb-4 inline-block hover:-translate-x-1 transition-transform">← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">{data.podcastTitle || "Podcast Directory"}</h1>
          <p className="text-lg text-zinc-600 max-w-2xl">{data.podcastSubtitle}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 mb-12">
          <input 
            type="text" 
            placeholder="Search by episode title or guest..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-zinc-500 font-medium text-xl">
              No episodes found matching your search.
            </div>
          ) : (
            filtered.map((pod, i) => (
              <Link href={`/podcasts/${slugify(pod.title)}`} key={i} className="group relative bg-white rounded-3xl p-6 border border-zinc-100 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image src={pod.image} alt={pod.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <span className="text-sm uppercase font-bold text-indigo-600 mb-2 block">{pod.dur} • Episode</span>
                  <h4 className="text-xl font-bold text-zinc-900 mt-1 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{pod.title}</h4>
                  <p className="text-base text-zinc-500 font-medium">with {pod.guest}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
