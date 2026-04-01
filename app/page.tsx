'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const templates = [
    { id: 'heart', name: '❤️ หัวใจสีชมพู', color: 'bg-pink-100' },
    { id: 'star', name: '🌟 ดาวระยิบระยับ', color: 'bg-yellow-100' },
    { id: 'dark', name: '🌙 ลึกลับยามค่ำคืน', color: 'bg-gray-900 text-white' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">สร้างเซอร์ไพรส์ให้แฟน</h1>
      <p className="mb-8 text-gray-600">เลือกเทมเพลตที่คุณชอบ แล้วเริ่มสร้างเลย</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => router.push(`/create?template=${t.id}`)}
            className={`p-6 rounded-xl shadow-lg hover:scale-105 transition transform ${t.color} border border-gray-200`}
          >
            <h2 className="text-xl font-semibold">{t.name}</h2>
          </button>
        ))}
      </div>
    </main>
  )
}