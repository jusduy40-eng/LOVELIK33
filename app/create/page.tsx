'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function CreateForm() {
  const searchParams = useSearchParams()
  const template = searchParams.get('template') || 'heart'
  const router = useRouter()
  
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = ''

    if (file) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file)
      
      if (error) {
        alert('อัปโหลดรูปไม่สำเร็จ: ' + error.message)
        setLoading(false)
        return
      }
      const {  publicData } = supabase.storage.from('images').getPublicUrl(fileName)
      imageUrl = publicData.publicUrl
    }

    const { data, error } = await supabase
      .from('surprises')
      .insert([
        { template, message, image_url: imageUrl }
      ])
      .select()

    if (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message)
      setLoading(false)
    } else {
      const surpriseId = data[0].id
      router.push(`/s/${surpriseId}`)
    }
  }

  const templateNames: Record<string, string> = {
    heart: '💖 หัวใจสีชมพู',
    star: '⭐ ดาวระยิบระยับ',
    dark: '🌙 ลึกลับยามค่ำคืน',
    ocean: '🌊 มหาสมุทรสีฟ้า',
    sunset: '🌅 พระอาทิตย์ตก',
    forest: '🌲 ป่าสีเขียว',
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">สร้างเซอร์ไพรส์</h1>
          <p className="text-gray-600">เทมเพลต: {templateNames[template] || template}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💌 ข้อความถึงแฟน
              </label>
              <textarea
                required
                className="w-full rounded-xl border-2 border-gray-200 p-4 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="เขียนอะไรดีๆ ลงไปเลย... เช่น 'รักนะ', 'ขอบคุณที่อยู่ข้างกันเสมอ'"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📸 รูปคู่หรือรูปแฟน (ไม่บังคับ)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full rounded-xl border-2 border-gray-200 p-3 focus:border-pink-400 focus:outline-none transition-colors"
                />
                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ เลือกไฟล์: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  กำลังสร้าง...
                </span>
              ) : (
                '🎉 สร้างเว็บเซอร์ไพรส์'
              )}
            </button>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-white/50 backdrop-blur rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-3">💡 เคล็ดลับ</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• เขียนข้อความจากใจ จะทำให้แฟน感动มาก</li>
            <li>• ใส่รูปคู่ที่ความทรงจำดีๆ</li>
            <li>• ส่งลิงก์ให้แฟนตอนเวลาพิเศษ</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default function CreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">💖</div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <CreateForm />
    </Suspense>
  )
}
