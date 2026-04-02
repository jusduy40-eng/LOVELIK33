import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

async function getSurprise(id: string) {
  try {
    const { data, error } = await supabase
      .from('surprises')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}

export default async function SurprisePage({ params }: { params: { id: string } }) {
  const data = await getSurprise(params.id)

  if (!data) return notFound()

  const templates: Record<string, { bg: string; text: string; accent: string }> = {
    heart: { 
      bg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200', 
      text: 'text-pink-900',
      accent: 'from-pink-500 to-rose-500'
    },
    star: { 
      bg: 'bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200', 
      text: 'text-yellow-900',
      accent: 'from-yellow-500 to-amber-500'
    },
    dark: { 
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900', 
      text: 'text-white',
      accent: 'from-purple-400 to-pink-400'
    },
    ocean: { 
      bg: 'bg-gradient-to-br from-cyan-100 via-blue-100 to-cyan-200', 
      text: 'text-cyan-900',
      accent: 'from-cyan-500 to-blue-500'
    },
    sunset: { 
      bg: 'bg-gradient-to-br from-orange-100 via-pink-100 to-orange-200', 
      text: 'text-orange-900',
      accent: 'from-orange-500 to-pink-500'
    },
    forest: { 
      bg: 'bg-gradient-to-br from-green-100 via-emerald-100 to-green-200', 
      text: 'text-green-900',
      accent: 'from-green-500 to-emerald-500'
    },
  }

  const style = templates[data.template] || templates.heart

  return (
    <main className={`min-h-screen ${style.bg} ${style.text} py-16 px-4`}>
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-heartbeat">💖</div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              ถึงคนพิเศษ...
            </h1>
          </div>

          {/* Image */}
          {data.image_url && (
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src={data.image_url} 
                alt="Surprise" 
                className="mx-auto rounded-2xl shadow-2xl max-h-96 w-full object-cover transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
          )}

          {/* Message */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl whitespace-pre-wrap leading-relaxed text-center">
              {data.message}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`h-px flex-1 bg-gradient-to-r ${style.accent} opacity-50`} />
            <span className="text-2xl">💕</span>
            <div className={`h-px flex-1 bg-gradient-to-l ${style.accent} opacity-50`} />
          </div>

          {/* Footer */}
          <div className="text-center text-sm opacity-70 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>สร้างด้วย ❤️ จาก Surprise Web</p>
            <p className="mt-2 text-xs">ส่งต่อความรักให้คนพิเศษของคุณ</p>
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('คัดลอกลิงก์แล้ว! ส่งให้แฟนได้เลย 💕')
            }}
            className={`px-6 py-3 bg-gradient-to-r ${style.accent} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            📋 คัดลอกลิงก์
          </button>
        </div>
      </div>
    </main>
  )
}
