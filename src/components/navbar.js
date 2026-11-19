import Link from "next/link";

export default function Navbar() {
  return (
    // 🌌 เปลี่ยนพื้นหลังจากฟ้าล้วน เป็นไล่เฉดสี ฟ้า-ม่วง-ชมพูพาสเทล ละมุนตา
    <nav className="bg-gradient-to-r from-sky-400 via-indigo-400 to-pink-400 text-white shadow-md sticky top-0 z-50 backdrop-blur-md bg-opacity-90 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* 🏷️ Logo - เล่นสีทูโทนขาวตัดชมพูอ่อน */}
          <Link href="/" className="text-2xl font-black tracking-tight hover:opacity-90 transition-opacity">
            My<span className="text-pink-100 font-light">Website</span> 🌸
          </Link>

          {/* 🔗 Menu - ดีไซน์มินิมอล มีเส้นใต้สีชมพูวิ่งเวลา Hover */}
          <div className="flex items-center gap-8 font-medium text-[15px] tracking-wide">
            <Link
              href="/"
              className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-200 after:transition-all hover:after:w-full transition-colors duration-300"
            >
              🏠 หน้าแรก
            </Link>

            <Link
              href="/about"
              className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-200 after:transition-all hover:after:w-full transition-colors duration-300"
            >
              ℹ️ เกี่ยวกับ
            </Link>

            <Link
              href="/service"
              className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-200 after:transition-all hover:after:w-full transition-colors duration-300"
            >
              🛠️ บริการของเรา
            </Link>

            <Link
              href="/contact"
              className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-pink-200 after:transition-all hover:after:w-full transition-colors duration-300"
            >
              📞 ติดต่อ
            </Link>

            {/* 💖 Register Button - ปุ่มสมัครสมาชิกสีขาวนวล เด้งดึ๋งเมื่อกด ชี้แล้วเปลี่ยนเป็นสีชมพูพาสเทล */}
            <Link
              href="/register"
              className="bg-white/95 text-indigo-500 px-5 py-2 rounded-full font-bold shadow-sm hover:bg-pink-50 hover:text-pink-600 hover:shadow-md active:scale-95 transition-all duration-200"
            >
              ✨ สมัครสมาชิก 
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}