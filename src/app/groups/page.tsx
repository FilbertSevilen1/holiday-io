"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { fetchCmsData, slugify, DEFAULT_DATA } from "@/lib/data";

export default function GroupsSearchPage() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchCmsData().then(d => setData(d));
  }, []);

  const types = ["All", ...Array.from(new Set(data.groups.map(g => g.type)))];

  const filteredGroups = useMemo(() => {
    let result = data.groups.filter(g => 
      (g.loc.toLowerCase().includes(search.toLowerCase()) || g.desc.toLowerCase().includes(search.toLowerCase())) &&
      (filterType === "All" || g.type === filterType)
    );
    
    if (sortOrder === "asc") {
      result = result.sort((a, b) => a.loc.localeCompare(b.loc));
    } else {
      result = result.sort((a, b) => b.loc.localeCompare(a.loc));
    }
    
    return result;
  }, [data.groups, search, sortOrder, filterType]);

  return (
    <div className="min-h-screen bg-zinc-50 font-poppins pt-24 pb-24 px-6 md:px-16 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="text-indigo-600 font-bold mb-4 inline-block hover:-translate-x-1 transition-transform">← Back to Home</Link>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6">Explore Our Communities</h1>
          <p className="text-lg text-zinc-600 max-w-2xl">Find the perfect study group or community gathering near you. Filter by location, meeting type, or search explicitly for your area.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-200 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input 
            type="text" 
            placeholder="Search communities (e.g., Canggu)" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all font-medium"
          />
          <div className="flex w-full md:w-auto gap-4">
            <select 
              value={filterType} 
              onChange={e => setFilterType(e.target.value)}
              className="flex-1 md:w-48 p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer font-medium"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select 
              value={sortOrder} 
              onChange={e => setSortOrder(e.target.value)}
              className="flex-1 md:w-48 p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 cursor-pointer font-medium"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredGroups.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-zinc-500 font-medium text-xl">
              No communities found matching your criteria.
            </div>
          ) : (
            filteredGroups.map((group, i) => (
              <Link href={`/groups/${slugify(group.loc)}`} key={i} className="group relative bg-white rounded-[2rem] p-8 border border-zinc-100 hover:shadow-2xl hover:-translate-y-2 transition-all block">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold uppercase mb-4 bg-gradient-to-r ${group.color || "from-blue-500 to-indigo-600"} text-white`}>
                  {group.type}
                </span>
                <h4 className="text-2xl font-bold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">{group.loc}</h4>
                <p className="text-base font-semibold text-zinc-500 mb-4">{group.time}</p>
                <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between text-indigo-600 font-bold">
                  View Details
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
