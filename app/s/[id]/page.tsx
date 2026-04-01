import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

// ฟังก์ชันดึงข้อมูลจากฐานข้อมูล
async function getSurprise(id: string) {
  const { data, error } = await supabase
    .from('surprises')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

// Component หลัก
export default async function SurprisePage({ params }: { params: { id: string } }) {
  const data = await getSurprise(params.id)

  // ถ้าไม่พบข้อมูล แสดงหน้า 404
  if (!data) return notFound()

  // เลือกสีพื้นหลังตามเทมเพลต
  let bgClass = 'bg-white'
  let textClass = 'text-gray-800'
  
  if (data.template === 'heart') { 
    bgClass = 'bg-pink-100'
    textClass = 'text-pink-900' 
  } else if (data.template === 'star') { 
    bgClass = 'bg-yellow-100'
    textClass = 'text-yellow-900' 
  } else if (data.template === 'dark') { 
    bgClass = 'bg-gray-900'
    textClass = 'text-white' 
  }

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-10 ${bgClass} ${textClass}`}>
      <div className="max-w-2xl text-center space-y-6 animate-fade-in">
        {/* แสดงรูป (ถ้ามี) */}
        {data.image_url && (
          <img 
            src={data.image_url} 
            alt="Surprise" 
            className="mx-auto rounded-lg shadow-xl max-h-96 object-cover" 
          />
        )}
        
        {/* หัวข้อ */}
        <h1 className="text-4xl font-bold">ถึงคนพิเศษ...</h1>
        
        {/* ข้อความ */}
        <p className="text-xl whitespace-pre-wrap leading-relaxed">
          {data.message}
        </p>
        
        {/* Footer */}
        <div className="pt-8 text-sm opacity-70">
          สร้างด้วย ❤️ จาก Surprise Web
        </div>
      </div>
    </main>
  )
}