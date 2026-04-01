'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreatePage() {
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
        alert('อัปโหลดรูปไม่สำเร็จ')
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
      alert('เกิดข้อผิดพลาดในการบันทึก')
      setLoading(false)
    } else {
      const surpriseId = data[0].id
      router.push(`/s/${surpriseId}`)
    }
  }

  return (
    <main className="min-h-screen p-24 bg-gray-50 flex flex-col items-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">สร้างเซอร์ไพรส์ (ธีม: {template})</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ข้อความถึงแฟน</label>
            <textarea
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="เขียนอะไรดีๆ ลงไปเลย..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">รูปคู่หรือรูปแฟน (ไม่บังคับ)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
          >
            {loading ? 'กำลังสร้าง...' : 'สร้างเว็บเซอร์ไพรส์'}
          </button>
        </form>
      </div>
    </main>
  )
}