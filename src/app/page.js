"use client";

import Link from "next/link";
import { 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles,
  Palmtree,
  Mountain,
  Waves
} from "lucide-react";

export default function Home() {
  const destinations = [
    {
      title: "เกาะพีพี",
      location: "กระบี่",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
      tag: "ทะเล & ชายหาด",
      icon: Waves,
    },
    {
      title: "ดอยอินทนนท์",
      location: "เชียงใหม่",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
      tag: "ภูเขา & ธรรมชาติ",
      icon: Mountain,
    },
    {
      title: "วัดพระแก้ว",
      location: "กรุงเทพมหานคร",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800",
      tag: "วัฒนธรรม & ประวัติศาสตร์",
      icon: Palmtree,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden flex flex-col justify-between">
      {/* Background Decorative Dynamic Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ออกไปค้นพบโลกกว้างกับเรา</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            เปิดประสบการณ์ท่องเที่ยวยุคใหม่ <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200 bg-clip-text text-transparent">
              สัมผัสทุกปลายทางที่คุณฝัน
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            ค้นหาสถานที่ท่องเที่ยวสุดฮิต วางแผนการเดินทาง และร่วมแบ่งปันความทรงจำสุดพิเศษ
            กับคอมมูนิตี้การท่องเที่ยวที่ใหญ่ที่สุด
          </p>

          {/* Search Bar Widget */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-2xl border border-blue-500/30 rounded-2xl p-2 shadow-2xl shadow-blue-950">
              <div className="pl-3.5 text-slate-400">
                <Search className="w-5 h-5 text-cyan-400" />
              </div>
              <input
                type="text"
                placeholder="ค้นหาจุดหมายปลายทาง, จังหวัด หรือกิจกรรม..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium text-sm rounded-xl shadow-md transition-all duration-200 shrink-0 cursor-pointer">
                ค้นหา
              </button>
            </div>
          </div>
        </div>

        {/* Featured Destinations Section */}
        <div className="mt-16 sm:mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                จุดหมายปลายทางยอดนิยม
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                สถานที่ท่องเที่ยวยอดฮิตที่นักเดินทางโหวตให้เป็นอันดับต้นๆ
              </p>
            </div>
            <Link
              href="/destinations"
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
            >
              ดูทั้งหมด
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Destination Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 rounded-3xl overflow-hidden shadow-xl hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-medium text-cyan-300 border border-blue-500/30">
                      <Icon className="w-3.5 h-3.5" />
                      {item.tag}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {item.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-500/15 bg-slate-950/80 backdrop-blur-xl py-6 px-6 text-center text-xs text-slate-400">
        <p>© 2026 TravelVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}