"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
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
              className={`text-xl font-bold tracking-tight ${isScrolled ? "text-zinc-900 dark:text-white" : "text-white"}`}
            >
              Holiday.io
            </span>
          </div>
          <div
            className={`hidden md:flex gap-8 items-center text-sm font-medium ${isScrolled ? "text-zinc-600 dark:text-zinc-400" : "text-white/90"}`}
          >
            <a
              href="#about"
              className="hover:text-indigo-600 transition-colors"
            >
              About
            </a>
            <a
              href="#events"
              className="hover:text-indigo-600 transition-colors"
            >
              Events
            </a>
            <a
              href="#how-it-works"
              className="hover:text-indigo-600 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              Join Community
            </a>
          </div>
          <button className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative h-[95vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-community.png"
            alt="Community gathering in Bali"
            fill
            className="object-cover opacity-90 scale-105 animate-[pulse_8s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 w-full animate-fade-in font-poppins">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-100 uppercase bg-indigo-600/30 backdrop-blur-sm rounded-full border border-indigo-400/20">
              Welcome to the family
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Your Paradise. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-indigo-300">
                Better Together.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-100/90 leading-relaxed max-w-lg mb-10 font-light italic">
              "We believe every holiday is an opportunity for connection. Join
              our community of travelers and locals finding home in paradise."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-indigo-700 rounded-full font-semibold hover:bg-zinc-100 transition-all text-lg shadow-xl shadow-white/10 active:scale-95 group">
                Find a Community
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
              <button className="px-8 py-4 bg-indigo-600/20 backdrop-blur-md text-white rounded-full font-semibold hover:bg-indigo-600/40 transition-all text-lg border border-white/20 active:scale-95">
                Contact Host
              </button>
            </div>
            <p className="mt-6 text-zinc-300 text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Open to everyone - locals & travelers alike
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50">
          <div className="w-1 h-8 bg-gradient-to-b from-white to-transparent rounded-full" />
        </div>
      </section>

      {/* 2. SOCIAL PROOF / COMMUNITY FEEL */}
      <section className="relative bg-white dark:bg-zinc-950 py-12 md:py-16 -mt-10 z-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 overflow-hidden ring-2 ring-indigo-50"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?u=${i}`}
                      alt="Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-indigo-50">
                  +400
                </div>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
                Join 400+ members growing together
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full md:w-auto">
              {[
                { label: "Community Members", value: "400+" },
                { label: "Weekly Gatherings", value: "12+" },
                { label: "Meeting Styles", value: "Hybrid" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center md:items-start"
                >
                  <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 font-poppins">
                    {stat.value}
                  </span>
                  <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / VALUE SECTION */}
      <section
        id="about"
        className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-black/50 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
            <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900">
              <Image
                src="/group-discussion.png"
                alt="Community conversation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl max-w-[240px] border border-white/40">
              <p className="text-sm font-medium text-zinc-900 dark:text-white leading-relaxed">
                "Finding this group was the best part of my move to Bali. It
                feels like home."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100" />
                <span className="text-xs font-bold text-indigo-600">
                  — Sarah, Canggu
                </span>
              </div>
            </div>
          </div>

          <div className="font-poppins">
            <h2 className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">
              Why we gather
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
              Adventure Is Better <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500">
                Shared
              </span>
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              Living in a paradise like Bali can sometimes feel paradoxically
              isolating. At Holiday.io, we connect travelers, nomads, and locals
              to create meaningful friendships that last beyond the vacation.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Safe Network",
                  desc: "A verified community of travel enthusiasts and hosts.",
                },
                {
                  title: "Local Insights",
                  desc: "Go beyond the tourist traps with authentic local guides.",
                },
                {
                  title: "Real Connection",
                  desc: "Sharing meals, adventures, and stories together.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-lg group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. EVENTS SECTION (CARD GRID) */}
      <section
        id="events"
        className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 font-poppins"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Join a Study Near You
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
              We meet in various locations across Bali and online to make it
              easy for everyone to stay connected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                loc: "Canggu",
                time: "Every Tuesday • 7PM",
                type: "In-Person",
                color: "from-blue-500 to-indigo-600",
                desc: "A lively gathering focusing on foundations for digital nomads and travelers.",
              },
              {
                loc: "Sanur",
                time: "Biweekly Thursdays • 6:30PM",
                type: "In-Person",
                color: "from-indigo-600 to-purple-600",
                desc: "A cozy community session focused on deeper biblical study and long-term residency.",
              },
              {
                loc: "Online Zoom",
                time: "Every Sunday • 8PM",
                type: "Virtual",
                color: "from-purple-600 to-pink-500",
                desc: "For those on the move or joining us from around the world. Interactive and spiritual.",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${event.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-full transition-opacity`}
                />

                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 bg-gradient-to-r ${event.color} text-white`}
                >
                  {event.type}
                </span>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {event.loc}
                </h4>
                <p className="text-sm font-semibold text-indigo-600 mb-4">
                  {event.time}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                  {event.desc}
                </p>
                <button className="w-full py-4 rounded-2xl bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (STEP FLOW) */}
      <section
        id="how-it-works"
        className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-black/50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-white font-poppins">
              Getting Started is Easy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-zinc-800" />

            {[
              {
                num: "01",
                title: "Join Community",
                desc: "Sign up through our website or visit us on Instagram to see what's happening.",
              },
              {
                num: "02",
                title: "Attend Weekly Study",
                desc: "Come as you are to any of our physical or online meetings. Coffee is on us!",
              },
              {
                num: "03",
                title: "Grow & Support",
                desc: "Find deeper connections and start supporting others in their faith journey.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center text-2xl font-bold text-indigo-600 mb-8 border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-500 hover:rotate-3">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 font-poppins">
                  {step.title}
                </h4>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-[280px] leading-relaxed italic">
                  "{step.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MISSION & VISION */}
      <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 font-poppins relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800">
          <div className="bg-white dark:bg-zinc-900 p-12 md:p-20 relative group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21l-12-18h24z" />
              </svg>
            </div>
            <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-6">
              Our Mission
            </h4>
            <p className="text-2xl md:text-3xl font-medium text-zinc-800 dark:text-white leading-tight">
              To build a global community of adventure where every traveler
              finds a place to belong and every destination feels like home.
            </p>
          </div>
          <div className="bg-indigo-600 p-12 md:p-20 text-white flex flex-col justify-center">
            <h4 className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-6">
              Our Vision
            </h4>
            <blockquote className="text-2xl md:text-3xl font-medium italic mb-8">
              "To make the world smaller and more inclusive through authentic
              travel experiences and deep human connection."
            </blockquote>
            <p className="text-indigo-200 text-sm font-bold">
              — Holiday.io Leadership
            </p>
          </div>
        </div>
      </section>

      {/* 7. PODCAST / CONTENT SECTION */}
      <section className="py-24 px-6 md:px-16 bg-zinc-50 dark:bg-black/50 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                The "Bali Breath" Podcast
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Weekly spiritual injections from our community speakers.
              </p>
            </div>
            <button className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-full font-bold flex items-center gap-3 shadow-md border border-zinc-100 dark:border-zinc-800 hover:scale-105 transition-transform active:scale-95">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#1DB954]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.306c-.215.352-.676.467-1.026.251-2.875-1.756-6.495-2.153-10.757-1.177-.403.093-.806-.16-.899-.563-.093-.403.16-.806.563-.899 4.657-1.066 8.653-.618 11.868 1.344.35.215.466.677.251 1.026z" />
              </svg>
              Listen on Spotify
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Finding Peace in the Noise",
                guest: "Pastor Marcus",
                dur: "24 min",
                image: "/beach-prayer.png",
              },
              {
                title: "Bali Digital Nomads & Faith",
                guest: "Elena G.",
                dur: "18 min",
                image: "/group-discussion.png",
              },
            ].map((pod, i) => (
              <div
                key={i}
                className="group glass rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-white/20 hover:shadow-xl transition-all"
              >
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={pod.image}
                    alt={pod.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center pl-1 hover:scale-110 transition-transform cursor-pointer">
                      <svg
                        className="w-4 h-4 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 22v-20l18 10-18 10z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-left flex-grow">
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-widest">
                    {pod.dur} • Episode {i + 4}
                  </span>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white mt-1 mb-2 leading-tight">
                    {pod.title}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    with {pod.guest}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 bg-white dark:bg-zinc-950 overflow-hidden font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-800 rounded-[2rem] overflow-hidden shadow-inner">
            {[
              {
                text: "I came to Bali for the beaches, but I stayed because I found a family here. This study group saved my mental health when I was feeling lonely.",
                name: "Chris L.",
                role: "Expats Community",
              },
              {
                text: "Simple, honest, and transformative. It's the highlight of my week in Bali.",
                name: "Ayu W.",
                role: "Local Member",
              },
            ].map((test, i) => (
              <div
                key={i}
                className="p-12 md:p-16 bg-white dark:bg-zinc-900 flex flex-col justify-between"
              >
                <div className="mb-8">
                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100" />
                  <div>
                    <h5 className="font-bold text-zinc-900 dark:text-white leading-none mb-1">
                      {test.name}
                    </h5>
                    <p className="text-xs text-zinc-500 font-medium tracking-widest">
                      {test.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA (STRONG CLOSE) */}
      <section id="contact" className="py-24 px-6 md:px-16 font-poppins">
        <div className="max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden bg-zinc-900 p-12 md:p-24 text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/beach-prayer.png"
              alt="Call to action"
              fill
              className="object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
          </div>

          <div className="relative z-10 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Ready to connect?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100/80 mb-12 max-w-lg mx-auto font-light">
              Chat with our team to join your first experience or find a local
              host.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="https://wa.me/6281243522118"
                target="_blank"
                className="px-10 py-5 bg-white text-zinc-900 rounded-full font-bold text-lg hover:bg-zinc-100 hover:scale-105 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Jaya
              </a>
              <a
                href="https://wa.me/6282122848688"
                target="_blank"
                className="px-10 py-5 bg-transparent text-white rounded-full font-bold text-lg border border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Filbert
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 pt-12 border-t border-white/10">
              <div className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                Follow the journey
              </div>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  FB
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  IG
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-20 px-6 md:px-16 bg-white dark:bg-zinc-950 font-poppins border-t border-zinc-100 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Holiday.io
              </span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              A community for travelers and adventure-seekers finding home in
              every corner of the world. Connect, explore, and stay together.
            </p>
            <div className="flex gap-4">
              {/* Instagram link placeholder */}
              <div className="text-xs font-bold text-indigo-600 cursor-pointer">
                @holiday.io_official
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-zinc-900 dark:text-white text-sm">
                Community
              </h5>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Join a Group
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Events Calendar
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Prayer Requests
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-zinc-900 dark:text-white text-sm">
                About
              </h5>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Our Vision
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Pastors & Leaders
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="font-bold text-zinc-900 dark:text-white text-sm">
                Content
              </h5>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Podcast
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Blog
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-indigo-600"
              >
                Resources
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-400">
          <p>© 2026 Holiday.io Platform. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Contact */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group">
          <svg
            className="w-8 h-8 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
