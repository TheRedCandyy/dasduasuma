import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSoundStore } from '@/store/useSoundStore'

const Countdown = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation()
  const { soundEnabled } = useSoundStore()
  const [count, setCount] = useState(3)

  // Play a subtle tick sound if sound is enabled
  const playTickSound = () => {
    if (soundEnabled) {
      const tick = new Audio('/audio/tick.mp3')
      tick.volume = 0.3
      tick.play().catch(error => console.error('Error playing tick sound:', error))
    }
  }

  useEffect(() => {
    if (count > 0) {
      playTickSound()

      const timer = setTimeout(() => {
        setCount(count - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // Countdown finished
      onComplete()
    }
  }, [count, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#534c3e]">
      <div className="text-center">
        {count > 0 ? (
          <div className="countdown-number relative">
            <span className="text-[150px] font-serif text-[#f0e4c7] animate-pulse">{count}</span>
            <div
              className="absolute inset-0 bg-[#534c3e] mix-blend-difference rounded-full animate-ping-slow opacity-30"
              style={{ animationDuration: '1s' }}
            ></div>
          </div>
        ) : (
          <div className="text-3xl font-serif text-[#f0e4c7] animate-fade-in">
            {t('sensorialExperience.countdown.begin', 'Begin Experience')}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 0.3;
            }
            70% {
              transform: scale(2);
              opacity: 0;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }
          .animate-ping-slow {
            animation: ping-slow 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-in forwards;
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

export default Countdown
