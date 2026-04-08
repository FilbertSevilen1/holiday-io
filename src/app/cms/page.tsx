"use client";
import { useState, useEffect } from "react";
import { fetchCmsData } from "@/lib/data";

const TABS = [
  { id: "hero", label: "Hero & About" },
  { id: "groups", label: "Groups" },
  { id: "steps", label: "Getting Started" },
  { id: "mission", label: "Mission & Vision" },
  { id: "podcast", label: "Podcasts" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact CTA" },
];

export default function CMSPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cmsDataCache");
      const cacheTime = localStorage.getItem("cmsDataCacheTime");
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime) <= 60 * 60 * 1000)) {
        try { return JSON.parse(cached); } catch(e) {}
      }
    }
    return null;
  });
  const [msg, setMsg] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    setIsMounted(true);
    if (!data) {
      fetchCmsData().then((d) => {
         setData(d);
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (arrayName: string, index: number, field: string, value: string) => {
    const newArray = [...(data as any)[arrayName]];
    newArray[index][field] = value;
    setData({ ...data, [arrayName]: newArray });
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    const newArray = [...(data as any)[arrayName]];
    newArray.splice(index, 1);
    setData({ ...data, [arrayName]: newArray });
  };

  const addArrayItem = (arrayName: string, newItem: any) => {
    const newArray = [...((data as any)[arrayName] || []), newItem];
    setData({ ...data, [arrayName]: newArray });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, arrayName: string, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setMsg("Uploading...");

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
      const res = await fetch(`${baseUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        // Immediately splice the resultant string into array
        handleArrayChange(arrayName, index, "image", result.path);
        setMsg("Image uploaded successfully!");
      } else {
        setMsg("Error uploading image");
      }
    } catch (err) {
      setMsg("Connection error on upload");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const handleSave = async () => {
    setMsg("Saving...");
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
      const res = await fetch(`${baseUrl}/api/cms/landing_page`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setMsg("Saved successfully!");
        // CRITICAL: Invalidate the 1-hour cache so the main site immediately sees these updates!
        if (typeof window !== "undefined") {
          localStorage.removeItem("cmsDataCache");
          localStorage.removeItem("cmsDataCacheTime");
        }
      } else {
        setMsg("Error saving data");
      }
    } catch (e) {
      setMsg("Error connecting to server");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const Sidebar = () => (
    <div className="w-64 bg-zinc-900 border-r border-zinc-200 p-6 flex flex-col fixed h-full z-10 text-white shadow-xl shadow-black/10">
      <h1 className="text-2xl font-bold text-white mb-2">CMS Admin</h1>
      <p className="text-zinc-400 text-sm mb-8 pb-4 border-b border-zinc-800">Manage your landing page on the fly.</p>
      <div className="flex-1 space-y-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );

  if (!isMounted || !data) {
    return (
      <div className="min-h-screen bg-zinc-50 flex text-black">
        <Sidebar />
        {/* SKELETON */}
        <div className="ml-64 flex-1 p-8 md:p-12 overflow-y-auto min-h-screen pointer-events-none">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="h-10 w-64 bg-zinc-200 animate-pulse rounded" />
              <div className="h-12 w-48 bg-zinc-200 animate-pulse rounded-full" />
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8">
              <div className="space-y-8">
                <div>
                  <div className="h-4 w-32 bg-zinc-200 animate-pulse rounded mb-4" />
                  <div className="h-16 w-full bg-zinc-100 animate-pulse rounded-xl" />
                </div>
                <div>
                  <div className="h-4 w-32 bg-zinc-200 animate-pulse rounded mb-4" />
                  <div className="h-32 w-full bg-zinc-100 animate-pulse rounded-xl" />
                </div>
                <hr className="border-t border-zinc-100" />
                <div>
                  <div className="h-4 w-32 bg-zinc-200 animate-pulse rounded mb-4" />
                  <div className="h-16 w-full bg-zinc-100 animate-pulse rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex text-black">
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8 md:p-12 overflow-y-auto min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-800 tracking-tight">{TABS.find(t => t.id === activeTab)?.label} Settings</h2>
            <div className="flex items-center gap-4">
              {msg && <span className="text-sm font-semibold px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full animate-fade-in">{msg}</span>}
              <button
                onClick={handleSave}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Save Live Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 p-8">
            {activeTab === "hero" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Hero Title (Use \n for breaks)</label>
                  <input type="text" name="heroTitle" value={data.heroTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Hero Subtitle</label>
                  <textarea name="heroSubtitle" value={data.heroSubtitle} onChange={handleChange} rows={3} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                </div>
                <hr className="border-t border-zinc-100" />
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">About Section Title</label>
                  <input type="text" name="aboutTitle" value={data.aboutTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none" />
                </div>
              </div>
            )}

            {activeTab === "groups" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Section Title</label>
                  <input type="text" name="groupsTitle" value={data.groupsTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Section Subtitle</label>
                  <textarea name="groupsSubtitle" value={data.groupsSubtitle} onChange={handleChange} rows={2} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <hr className="my-8" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-800">Group Cards</h3>
                  <button onClick={() => addArrayItem("groups", { loc: "New Location", time: "TBD", type: "In-Person", color: "from-blue-500 to-indigo-600", desc: "" })} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
                    + Add Group
                  </button>
                </div>
                {data.groups.map((group: any, i: number) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 relative group-card">
                    <button onClick={() => removeArrayItem("groups", i)} className="absolute top-4 right-4 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Delete</button>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Location</label>
                        <input type="text" value={group.loc} onChange={(e) => handleArrayChange("groups", i, "loc", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Time</label>
                        <input type="text" value={group.time} onChange={(e) => handleArrayChange("groups", i, "time", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Group Type</label>
                        <input type="text" value={group.type} onChange={(e) => handleArrayChange("groups", i, "type", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Description</label>
                        <textarea rows={2} value={group.desc} onChange={(e) => handleArrayChange("groups", i, "desc", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "steps" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Getting Started Title</label>
                  <input type="text" name="gettingStartedTitle" value={data.gettingStartedTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <hr className="my-8" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-800">Step Cards</h3>
                  <button onClick={() => addArrayItem("steps", { num: `0${data.steps.length+1}`, title: "New Step", desc: "" })} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
                    + Add Step
                  </button>
                </div>
                {data.steps.map((step: any, i: number) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 relative">
                    <div className="absolute top-4 left-4 text-xs font-bold text-zinc-400">Step Card</div>
                    <button onClick={() => removeArrayItem("steps", i)} className="absolute top-4 right-4 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Delete</button>
                    <div className="grid grid-cols-1 gap-4 pt-6">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Step Number</label>
                        <input type="text" value={step.num} onChange={(e) => handleArrayChange("steps", i, "num", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Title</label>
                        <input type="text" value={step.title} onChange={(e) => handleArrayChange("steps", i, "title", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Description</label>
                        <textarea rows={2} value={step.desc} onChange={(e) => handleArrayChange("steps", i, "desc", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "mission" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Mission Statement</label>
                  <textarea name="missionText" value={data.missionText} onChange={handleChange} rows={4} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Vision Statement</label>
                  <textarea name="visionText" value={data.visionText} onChange={handleChange} rows={4} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
            )}

            {activeTab === "podcast" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Podcast Section Title</label>
                  <input type="text" name="podcastTitle" value={data.podcastTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Podcast Subtitle</label>
                  <textarea name="podcastSubtitle" value={data.podcastSubtitle} onChange={handleChange} rows={2} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <hr className="my-8" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-800">Podcast Cards</h3>
                  <button onClick={() => addArrayItem("podcasts", { title: "New Episode", guest: "TBA", dur: "0 min", image: "/beach-prayer.png" })} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
                    + Add Podcast
                  </button>
                </div>
                {data.podcasts.map((pod: any, i: number) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 relative">
                    <button onClick={() => removeArrayItem("podcasts", i)} className="absolute top-4 right-4 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Delete</button>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Episode Title</label>
                        <input type="text" value={pod.title} onChange={(e) => handleArrayChange("podcasts", i, "title", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Guest</label>
                        <input type="text" value={pod.guest} onChange={(e) => handleArrayChange("podcasts", i, "guest", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Duration</label>
                        <input type="text" value={pod.dur} onChange={(e) => handleArrayChange("podcasts", i, "dur", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Image Context</label>
                        <div className="flex gap-2 items-center">
                          <input type="text" value={pod.image} onChange={(e) => handleArrayChange("podcasts", i, "image", e.target.value)} className="flex-1 p-3 border border-zinc-200 rounded-lg outline-none text-sm bg-zinc-50 font-mono" placeholder="/beach-prayer.png" />
                          <label className="cursor-pointer bg-white border border-zinc-200 hover:bg-zinc-50 text-indigo-600 font-bold px-4 py-3 rounded-lg transition-colors shadow-sm whitespace-nowrap text-sm">
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "podcasts", i)} className="hidden" />
                            Upload JPG/PNG
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-800">Review Cards</h3>
                  <button onClick={() => addArrayItem("reviews", { text: "Amazing!", name: "Anonymous", role: "Member" })} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
                    + Add Review
                  </button>
                </div>
                {data.reviews.map((rev: any, i: number) => (
                  <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4 relative">
                    <button onClick={() => removeArrayItem("reviews", i)} className="absolute top-4 right-4 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Delete</button>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Reviewer Name</label>
                        <input type="text" value={rev.name} onChange={(e) => handleArrayChange("reviews", i, "name", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Role / Label</label>
                        <input type="text" value={rev.role} onChange={(e) => handleArrayChange("reviews", i, "role", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-zinc-500 mb-1">Testimonial</label>
                        <textarea rows={3} value={rev.text} onChange={(e) => handleArrayChange("reviews", i, "text", e.target.value)} className="w-full p-3 border border-zinc-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">CTA Title</label>
                  <input type="text" name="contactTitle" value={data.contactTitle} onChange={handleChange} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">CTA Subtitle</label>
                  <textarea name="contactSubtitle" value={data.contactSubtitle} onChange={handleChange} rows={2} className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl outline-none" />
                </div>
                <hr className="my-8" />
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-zinc-800">WhatsApp Contact Buttons</h3>
                  <button onClick={() => addArrayItem("contacts", { name: "New Support", phone: "1234567890" })} className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-200">
                    + Add Contact Button
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  {data.contacts.map((contact: any, i: number) => (
                    <div key={i} className="p-4 border border-zinc-200 rounded-xl relative">
                      <button onClick={() => removeArrayItem("contacts", i)} className="absolute top-2 right-2 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 px-2 py-1 rounded">Delete</button>
                      <label className="block text-xs font-semibold text-emerald-600 mb-1 pt-4">Contact Name</label>
                      <input type="text" value={contact.name} onChange={(e) => handleArrayChange("contacts", i, "name", e.target.value)} className="w-full p-2 border border-zinc-200 rounded mb-3 outline-none" />
                      <label className="block text-xs font-semibold text-emerald-600 mb-1">Phone (with country code)</label>
                      <input type="text" value={contact.phone} onChange={(e) => handleArrayChange("contacts", i, "phone", e.target.value)} className="w-full p-2 border border-zinc-200 rounded outline-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
