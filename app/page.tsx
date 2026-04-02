'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const templates = [
    { 
      id: 'heart', 
      name: '💖 หัวใจสีชมพู', 
      color: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      icon: '💖'
    },
    { 
      id: 'star', 
      name: '⭐ ดาวระยิบระยับ', 
      color: 'from-yellow-400 to-amber-500',
      bg: 'bg-yellow-50',
      icon: '⭐'
    },
    { 
      id: 'dark', 
      name: '🌙 ลึกลับยามค่ำคืน', 
      color: 'from-purple-600 to-indigo-700',
      bg: 'bg-gray-900',
      icon: '🌙'
    },
    { 
      id: 'ocean', 
      name: '🌊 มหาสมุทรสีฟ้า', 
      color: 'from-cyan-400 to-blue-500',
      bg: 'bg-cyan-50',
      icon: '🌊'
    },
    { 
      id: 'sunset', 
      name: '🌅 พระอาทิตย์ตก', 
      color: 'from-orange-400 to-pink-500',
      bg: 'bg-orange-50',
      icon: '🌅'
    },
    { 
      id: 'forest', 
      name: '🌲 ป่าสีเขียว', 
      color: 'from-green-400 to-emerald-600',
      bg: 'bg-green-50',
      icon: '🌲'
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-purple-50">
      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            สร้างเซอร์ไพรส์ให้แฟน
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            ✨ ฟรี! ไม่มีค่าใช้จ่าย ง่ายและรวดเร็ว ✨
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            สร้างเว็บไซต์เซอร์ไพรส์แฟนในไม่กี่คลิก เลือกเทมเพลตที่ชอบ 
            เขียนข้อความ ใส่รูป แล้วส่งลิงก์ให้แฟนของคุณได้เลย!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-semibold text-lg mb-2">เทมเพลตสวยๆ</h3>
            <p className="text-gray-600 text-sm">เลือกได้จาก 6 สไตล์</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-3">📸</div>
            <h3 className="font-semibold text-lg mb-2">ใส่รูปได้</h3>
            <p className="text-gray-600 text-sm">อัปโหลดรูปคู่หรือรูปแฟน</p>
          </div>
          <div className="glass rounded-2xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="font-semibold text-lg mb-2">ใช้งานฟรี</h3>
            <p className="text-gray-600 text-sm">ไม่มีค่าใช้จ่ายตลอดไป</p>
          </div>
        </div>

        {/* Templates */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">เลือกเทมเพลต</h2>
          <p className="text-gray-600">คลิกที่เทมเพลตที่คุณชอบ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {templates.map((t, index) => (
            <button
              key={t.id}
              onClick={() => router.push(`/create?template=${t.id}`)}
              className={`group relative overflow-hidden rounded-2xl p-8 ${t.bg} border-2 border-transparent hover:border-pink-300 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="text-5xl mb-4 animate-bounce-slow">{t.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{t.name}</h3>
                <div className="mt-4 text-pink-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  เลือกเทมเพลตนี้ →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 text-gray-500">
          <p>สร้างด้วย ❤️ เพื่อความรักของคนไทย</p>
          <p className="text-sm mt-2">Surprise Web © 2024</p>
        </footer>
      </div>
    </main>
  )
}
