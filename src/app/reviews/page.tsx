"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function ReviewsSearchPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCmsData().then(d => setData(d));
  }, []);

  const filtered = useMemo(() => {
    return data.reviews.filter(r => 
      r.name.toLowerCase().includes(search.toLowerCase()) || 
      r.text.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [data.reviews, search]);

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-indigo-600 font-bold mb-4 inline-block hover:-translate-x-1 transition-transform">← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">Community Stories</h1>
          <p className="text-lg text-zinc-600 max-w-2xl">Read authentic testimonials and experiences from members across our locations globally.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 mb-12">
          <input 
            type="text" 
            placeholder="Search by name, role, or keywords..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-20 text-zinc-500 font-medium text-xl">
              No matching community stories found.
            </div>
          ) : (
            filtered.map((test, i) => (
              <Link href={`/reviews/${slugify(test.name)}`} key={i} className="group p-10 md:p-14 bg-white rounded-3xl border border-zinc-100 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col justify-between">
                <div className="mb-8 relative">
                  <span className="text-4xl text-indigo-200 font-serif absolute -top-8 -left-2 opacity-50 group-hover:text-indigo-300 transition-colors">"</span>
                  <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed italic line-clamp-4 relative z-10">{test.text}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md flex items-center justify-center text-white font-bold">
                       {test.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h5 className="font-bold text-zinc-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{test.name}</h5>
                      <p className="text-base text-zinc-500 font-medium">{test.role}</p>
                    </div>
                  </div>
                  <span className="text-indigo-600 font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">Read</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
