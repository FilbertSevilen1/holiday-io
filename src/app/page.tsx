"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { slugify, fetchCmsData, DEFAULT_DATA } from "@/lib/data";

const Skeleton = () => (
  <div className="relative min-h-screen bg-zinc-50 overflow-hidden font-poppins selection:bg-indigo-100 selection:text-indigo-900 pointer-events-none">
    {/* NAVBAR SKELETON */}
    <nav className="fixed top-0 z-50 w-full py-5">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between">
        <div className="w-32 h-8 bg-zinc-200/50 rounded-lg animate-pulse" />
        <div className="hidden md:flex gap-8"><div className="w-64 h-6 bg-zinc-200/50 rounded-full animate-pulse" /></div>
      </div>
    </nav>
    
    {/* HERO SKELETON */}
    <section className="relative h-[95vh] min-h-[600px] flex items-center mb-24">
      <div className="absolute inset-0 bg-zinc-200/40 animate-pulse" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full">
        <div className="w-48 h-8 rounded-full bg-zinc-300 animate-pulse mb-6" />
        <div className="w-3/4 h-24 rounded-2xl bg-zinc-300 animate-pulse mb-6" />
        <div className="w-1/2 h-12 rounded-2xl bg-zinc-300 animate-pulse mb-10" />
      </div>
    </section>

    {/* ABOUT SKELETON */}
    <div className="max-w-6xl mx-auto px-6 md:px-16 mb-24 grid md:grid-cols-2 gap-16 items-center">
      <div className="w-full h-[400px] bg-zinc-200 rounded-[2rem] animate-pulse" />
      <div className="space-y-6">
        <div className="w-1/4 h-6 bg-zinc-200 rounded animate-pulse" />
        <div className="w-full h-12 bg-zinc-200 rounded-xl animate-pulse" />
        <div className="w-full h-12 bg-zinc-200 rounded-xl animate-pulse" />
        <div className="w-3/4 h-24 bg-zinc-200 rounded-xl animate-pulse" />
      </div>
    </div>

    {/* CARDS SKELETON */}
    <div className="max-w-6xl mx-auto px-6 md:px-16 mb-24">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="w-1/3 h-10 bg-zinc-200 rounded-xl animate-pulse" />
        <div className="w-1/2 h-6 bg-zinc-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-zinc-200 rounded-[2rem] border border-zinc-100 animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cmsData, setCmsData] = useState<any>(() => {
    // Read cache synchronously on client to skip fetch delay later
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cmsDataCache");
      const cacheTime = localStorage.getItem("cmsDataCacheTime");
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime) <= 60 * 60 * 1000)) {
        try { return JSON.parse(cached); } catch(e) {}
      }
    }
    return null;
  });

  useEffect(() => {
    setIsMounted(true); // Hydration is finished
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Only fetch if cache wasn't perfectly parsed
    if (!cmsData) {
      fetchCmsData().then(d => {
        if (d) setCmsData(d);
      }).catch(() => setCmsData(DEFAULT_DATA));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cmsData]);

  // Force Skeleton rendering on strictly server execution AND initial hydration to prevent React Hydration Mismatch
  if (!isMounted || !cmsData) return <Skeleton />;

  return (
    <div className="relative min-h-screen selection:bg-indigo-100 selection:text-indigo-900 animate-fade-in transition-opacity duration-1000">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md dark:bg-black/80 py-3 shadow-sm border-b border-zinc-100 dark:border-zinc-800" : "bg-transparent py-5"}`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex items-center justify-between font-poppins">
          <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-lg shadow-indigo-200/50 shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span
              className={`text-xl font-bold  ${isScrolled ? "text-zinc-900 dark:text-white" : "text-white"}`}
            >
              Holiday.io
            </span>
          </div>
          <div
            className={`hidden md:flex gap-8 items-center text-base font-medium ${isScrolled ? "text-zinc-600 dark:text-zinc-400" : "text-white/90"}`}
          >
            <a href="#about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#events" className="hover:text-indigo-600 transition-colors">Events</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#contact" className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-95">Join Community</a>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-[95vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero-community.png" alt="Community" fill className="object-cover opacity-90 scale-105 animate-[pulse_8s_ease-in-out_infinite]" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-900/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full animate-fade-in font-poppins">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-base font-semibold text-indigo-100 uppercase bg-indigo-600/30 backdrop-blur-sm rounded-full border border-indigo-400/20">
              Welcome to the family
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-6 whitespace-pre-line">
              {cmsData.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-zinc-100/90 leading-relaxed max-w-lg mb-10 font-light italic whitespace-pre-line">
              {cmsData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT */}
      <section id="about" className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-black/50 overflow-hidden font-poppins">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image src="/group-discussion.png" alt="Community conversation" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-indigo-600 uppercase mb-4">Why we gather</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight whitespace-pre-line">
              {cmsData.aboutTitle}
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Living in a paradise like Bali can sometimes feel paradoxically isolating. At Holiday.io, we connect travelers to create meaningful friendships.
            </p>
          </div>
        </div>
      </section>

      {/* 4. EVENTS */}
      <section id="events" className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              {cmsData.groupsTitle}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {cmsData.groupsSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cmsData.groups.map((event: any, i: number) => (
              <Link href={`/groups/${slugify(event.loc)}`} key={i} className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 hover:-translate-y-2 hover:shadow-xl transition-all flex flex-col cursor-pointer">
                <span className={`inline-block px-3 py-1 rounded-full text-base font-bold uppercase mb-4 bg-gradient-to-r self-start ${event.color || "from-blue-500 to-indigo-600"} text-white`}>
                  {event.type}
                </span>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">{event.loc}</h4>
                <p className="text-base font-semibold text-indigo-600 mb-4">{event.time}</p>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-grow">{event.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
             <Link href="/groups" className="text-indigo-600 font-bold hover:underline text-lg">Browse all communities &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white font-poppins">{cmsData.gettingStartedTitle}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
            {cmsData.steps.map((step: any, i: number) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-2xl font-bold text-indigo-600 mb-8 border border-zinc-100">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 font-poppins">{step.title}</h4>
                <p className="text-zinc-500 italic max-w-[280px]">"{step.desc}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MISSION & VISION */}
      <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 font-poppins">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100">
          <div className="bg-white p-12 md:p-20 relative">
            <h4 className="text-base font-bold text-indigo-600 uppercase mb-6">Our Mission</h4>
            <p className="text-2xl md:text-3xl font-medium text-zinc-800 leading-tight whitespace-pre-line">{cmsData.missionText}</p>
          </div>
          <div className="bg-indigo-600 p-12 md:p-20 text-white flex flex-col justify-center">
            <h4 className="text-base font-bold text-white/70 uppercase mb-6">Our Vision</h4>
            <blockquote className="text-2xl md:text-3xl font-medium italic mb-8 whitespace-pre-line">{cmsData.visionText}</blockquote>
          </div>
        </div>
      </section>

      {/* 7. PODCAST */}
      <section className="py-24 px-6 md:px-16 bg-zinc-50 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">{cmsData.podcastTitle}</h2>
              <p className="text-zinc-500 whitespace-pre-line">{cmsData.podcastSubtitle}</p>
            </div>
            <button className="px-8 py-3 bg-white text-zinc-900 rounded-full font-bold shadow-md border hover:scale-105 transition-transform flex items-center gap-3">
               Listen on Spotify
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cmsData.podcasts.map((pod: any, i: number) => (
              <Link href={`/podcasts/${slugify(pod.title)}`} key={i} className="glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 border hover:shadow-xl transition-all cursor-pointer group">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image src={pod.image} alt={pod.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <span className="text-base uppercase font-bold text-indigo-600 ">{pod.dur} • Episode</span>
                  <h4 className="text-xl font-bold text-zinc-900 mt-1 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{pod.title}</h4>
                  <p className="text-base text-zinc-500">with {pod.guest}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
             <Link href="/podcasts" className="text-zinc-600 font-bold hover:underline text-lg">See all episodes &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 bg-white font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-zinc-100 rounded-[2rem] overflow-hidden shadow-inner">
            {cmsData.reviews.map((test: any, i: number) => (
              <Link href={`/reviews/${slugify(test.name)}`} key={i} className="p-12 md:p-16 bg-white flex flex-col justify-between hover:bg-zinc-50 transition-colors cursor-pointer group">
                <div className="mb-8">
                  <p className="text-xl md:text-2xl text-zinc-800 leading-relaxed italic whitespace-pre-line relative z-10 transition-colors group-hover:text-black">"{test.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden flex items-center justify-center font-bold text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                     {test.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-zinc-900 leading-none mb-1 group-hover:text-indigo-600 transition-colors">{test.name}</h5>
                    <p className="text-base text-zinc-500 font-medium ">{test.role}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
             <Link href="/reviews" className="text-zinc-600 font-bold hover:underline text-lg">Read more community stories &rarr;</Link>
          </div>
        </div>
      </section>

      {/* 9. CONTACT */}
      <section id="contact" className="py-24 px-6 md:px-16 font-poppins relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl shadow-indigo-900/20 border border-white/10 group">
          
          <div className="absolute inset-0 z-0 bg-zinc-900 overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-100 animate-pulse transition-transform duration-1000 group-hover:scale-110" />
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[120px] opacity-100 animate-pulse transition-transform duration-1000 delay-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 p-12 md:p-32 flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-purple-200 mb-8 leading-tight">
              {cmsData.contactTitle}
            </h2>
            
            <p className="text-xl md:text-2xl text-indigo-100/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
              {cmsData.contactSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-3xl">
              {cmsData.contacts.map((contact: any, i: number) => (
                <a 
                  key={i} 
                  href={`https://wa.me/${contact.phone}`} 
                  target="_blank" 
                  className={`
                    flex-1 flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300
                    ${i % 2 === 0 
                      ? 'bg-white text-zinc-900 border border-transparent shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1' 
                      : 'bg-white/5 text-white border border-white/20 backdrop-blur-md hover:bg-white/10 hover:-translate-y-1'}
                  `}
                >
                  <svg className={`w-6 h-6 ${i % 2 === 0 ? 'text-emerald-500' : 'text-emerald-400'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with {contact.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
