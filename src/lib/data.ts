export const DEFAULT_DATA = {
  heroTitle: "Your Paradise.\nBetter Together.",
  heroSubtitle: "\"We believe every holiday is an opportunity for connection. Join our community of travelers and locals finding home in paradise.\"",
  aboutTitle: "Adventure Is Better Shared",
  groupsTitle: "Join a Study Near You",
  groupsSubtitle: "We meet in various locations across Bali and online to make it easy for everyone to stay connected.",
  groups: [
    { loc: "Canggu", time: "Every Tuesday • 7PM", type: "In-Person", color: "from-blue-500 to-indigo-600", desc: "A lively gathering focusing on foundations for digital nomads and travelers." },
    { loc: "Sanur", time: "Biweekly Thursdays • 6:30PM", type: "In-Person", color: "from-indigo-600 to-purple-600", desc: "A cozy community session focused on deeper biblical study and long-term residency." },
    { loc: "Online Zoom", time: "Every Sunday • 8PM", type: "Virtual", color: "from-purple-600 to-pink-500", desc: "For those on the move or joining us from around the world. Interactive and spiritual." }
  ],
  gettingStartedTitle: "Getting Started is Easy",
  steps: [
    { num: "01", title: "Join Community", desc: "Sign up through our website or visit us on Instagram to see what's happening." },
    { num: "02", title: "Attend Weekly Study", desc: "Come as you are to any of our physical or online meetings. Coffee is on us!" },
    { num: "03", title: "Grow & Support", desc: "Find deeper connections and start supporting others in their faith journey." }
  ],
  missionText: "To build a global community of adventure where every traveler finds a place to belong and every destination feels like home.",
  visionText: "\"To make the world smaller and more inclusive through authentic travel experiences and deep human connection.\"",
  podcastTitle: "The \"Bali Breath\" Podcast",
  podcastSubtitle: "Weekly spiritual injections from our community speakers.",
  podcasts: [
    { title: "Finding Peace in the Noise", guest: "Pastor Marcus", dur: "24 min", image: "/beach-prayer.png" },
    { title: "Bali Digital Nomads & Faith", guest: "Elena G.", dur: "18 min", image: "/group-discussion.png" }
  ],
  reviews: [
    { text: "I came to Bali for the beaches, but I stayed because I found a family here. This study group saved my mental health when I was feeling lonely.", name: "Chris L.", role: "Expats Community" },
    { text: "Simple, honest, and transformative. It's the highlight of my week in Bali.", name: "Ayu W.", role: "Local Member" }
  ],
  contactTitle: "Ready to connect?",
  contactSubtitle: "Chat with our team to join your first experience or find a local host.",
  contacts: [
    { name: "Jaya", phone: "6281243522118" },
    { name: "Filbert", phone: "6282122848688" }
  ]
};

export async function fetchCmsData() {
  try {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("cmsDataCache");
      const cacheTime = localStorage.getItem("cmsDataCacheTime");
      
      if (cached && cacheTime) {
        const isExpired = Date.now() - parseInt(cacheTime) > 60 * 60 * 1000;
        if (!isExpired) {
          return JSON.parse(cached);
        }
      }
    }

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001').replace(/\/+$/, '');
    const res = await fetch(`${baseUrl}/api/cms/landing_page`);
    const d = await res.json();
    if (!d.error && d.heroTitle) {
      const finalData = { ...DEFAULT_DATA, ...d, contacts: d.contacts || DEFAULT_DATA.contacts };
      if (typeof window !== "undefined") {
        localStorage.setItem("cmsDataCache", JSON.stringify(finalData));
        localStorage.setItem("cmsDataCacheTime", Date.now().toString());
      }
      return finalData;
    }
    return DEFAULT_DATA;
  } catch (e) {
    return DEFAULT_DATA;
  }
}

export function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
