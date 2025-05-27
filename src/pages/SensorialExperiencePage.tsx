import { useNavigate } from 'react-router-dom'
import { useSensorialExperienceStore } from '@/store/useSensorialExperienceStore'
import Countdown from '@/components/sensorial/Countdown'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, Search, Smile, Send, CheckCircle, AlertCircle } from 'lucide-react'

// Define the sections of the experience
const TOTAL_STEPS = 7

// Fade component for consistent animations
const FadeIn = ({
  children,
  delay = 0,
  duration = 700,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false) // Reset on delay change for re-trigger
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay, children]) // Re-run if children change for keyed components

  return (
    <div
      className={`transition-all ease-in-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`,
        // transitionDelay: `${delay}ms`, // Delay is handled by setTimeout now for visibility
      }}
    >
      {children}
    </div>
  )
}

const SensorialExperiencePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isUnlocked, currentStep, setCurrentStep } = useSensorialExperienceStore()
  const [showCountdown, setShowCountdown] = useState(true)
  const [currentDefectIndex, setCurrentDefectIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isSectionContentVisible, setIsSectionContentVisible] = useState(false)

  // Questionnaire State
  const [likedWine, setLikedWine] = useState<boolean | null>(null)
  const [complexWine, setComplexWine] = useState<boolean | null>(null)
  const [defectGuess, setDefectGuess] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error' | 'submitting'
  >('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  // Redirect if not unlocked
  useEffect(() => {
    if (!isUnlocked) {
      navigate('/')
    }
  }, [isUnlocked, navigate])

  // Handle countdown completion
  const handleCountdownComplete = () => {
    setShowCountdown(false)
    setCurrentStep(1) // Start at the first step
  }

  // Function to manually scroll to a section
  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth
      containerRef.current.scrollLeft = width * index
    }
  }

  // Manage section visibility through state rather than scroll position
  useEffect(() => {
    if (currentStep > 0 && currentStep <= TOTAL_STEPS) {
      setIsSectionContentVisible(false) // Hide content before scroll
      // Scroll to the new section
      scrollToSection(currentStep - 1)
      // Make content visible after a short delay to allow scroll to settle and fade-in effect
      const timer = setTimeout(() => {
        setIsSectionContentVisible(true)
      }, 50) // Small delay for scroll to start, FadeIn component handles its own animation
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  // If not unlocked, we'll redirect in the useEffect
  if (!isUnlocked) {
    return null
  }

  // If countdown is showing, show the countdown
  if (showCountdown) {
    return <Countdown onComplete={handleCountdownComplete} />
  }

  // Define content for each step
  // This makes the return statement cleaner and content more manageable
  const defectsKeys = ['diacetil', 'oxidation', 'cooked', 'acetaldehyde'] as const
  const currentDefectKey = defectsKeys[currentDefectIndex]

  const handleQuestionnaireSubmit = async () => {
    if (!userEmail) {
      setSubmissionStatus('error')
      setSubmissionMessage(t('sensorialExperience.questionnaire.feedbackMissingEmail'))
      setTimeout(() => {
        // Keep message but allow retry
        // setSubmissionStatus('idle')
        // setSubmissionMessage('')
      }, 3000)
      return
    }

    setSubmissionStatus('submitting')
    setSubmissionMessage('') // Clear previous messages

    const data = {
      likedWine:
        likedWine === null
          ? 'N/A'
          : likedWine
            ? t('sensorialExperience.questionnaire.yes')
            : t('sensorialExperience.questionnaire.no'),
      complexWine:
        complexWine === null
          ? 'N/A'
          : complexWine
            ? t('sensorialExperience.questionnaire.yes')
            : t('sensorialExperience.questionnaire.no'),
      defectGuess,
      userEmail,
    }

    try {
      const response = await fetch('https://www.dasduasuma.pt/api/send_questionnaire_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.status === 'success') {
        setSubmissionStatus('success')
        setSubmissionMessage(
          result.message || t('sensorialExperience.questionnaire.feedbackThankYou')
        )
        // Navigate to home page after successful submission and thank you message
        setTimeout(() => {
          navigate('/')
        }, 4000) // Keep message for 4 seconds
      } else {
        setSubmissionStatus('error')
        setSubmissionMessage(result.message || 'An error occurred while submitting your feedback.')
        // setTimeout to clear error and allow retry after a few seconds
        setTimeout(() => {
          // setSubmissionStatus('idle'); // Or keep the error message until user interacts
        }, 5000)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmissionStatus('error')
      setSubmissionMessage('A network error occurred. Please try again.')
      // setTimeout to clear error and allow retry
      setTimeout(() => {
        // setSubmissionStatus('idle');
      }, 5000)
    }
  }

  const sectionContents = [
    // Section 1: Low-intervention wines
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7]">
        {t('sensorialExperience.title')}
      </h2>
      <div className="mb-16">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#f0e4c7] mb-6 font-serif italic">
          {t('sensorialExperience.lowIntervention.title')}
        </h3>
        <p className="text-base text-[#e9ddc0] leading-relaxed mb-4">
          {t('sensorialExperience.lowIntervention.description1')}
        </p>
        <p className="text-base text-[#e9ddc0] leading-relaxed">
          {t('sensorialExperience.lowIntervention.description2')}
        </p>
      </div>
    </FadeIn>,

    // Section 2: Some defects that can be virtues
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7]">
        {t('sensorialExperience.defectsAsVirtues.title')}
      </h2>
      <div className="mb-8 p-6 bg-[#6a6050]/50 rounded-lg shadow-xl backdrop-blur-md min-h-[260px] flex flex-col justify-center">
        {/* Keyed FadeIn for defect content transition */}
        <FadeIn delay={0} duration={400} key={currentDefectKey}>
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#e0d4b6]">
            {t(`sensorialExperience.defectsAsVirtues.${currentDefectKey}.title`)}
          </h3>
          <p className="text-base sm:text-lg mb-2 text-[#d4c8a6]">
            <span className="font-semibold text-[#c0b496]">
              {t('sensorialExperience.defectsAsVirtues.description')}:
            </span>{' '}
            {t(`sensorialExperience.defectsAsVirtues.${currentDefectKey}.description`)}
          </p>
          <p className="text-base sm:text-lg text-[#d4c8a6]">
            <span className="font-semibold text-[#c0b496]">
              {t('sensorialExperience.defectsAsVirtues.cause')}:
            </span>{' '}
            {t(`sensorialExperience.defectsAsVirtues.${currentDefectKey}.cause`)}
          </p>
        </FadeIn>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentDefectIndex(prev => Math.min(defectsKeys.length - 1, prev + 1))}
          disabled={currentDefectIndex === defectsKeys.length - 1 || isTransitioning}
          className="px-6 py-2.5 bg-[#6a6050] hover:bg-[#7a7060] text-[#f0e4c7] rounded-lg shadow-md transition-colors duration-300 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('sensorialExperience.navigation.nextDefect')}
        </button>
      </div>
    </FadeIn>,

    // NEW Section 3: The Wine - Introduction
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7] text-center">
        {t('sensorialExperience.theWine.title')}
      </h2>
      <div className="bg-[#6a6050]/50 p-6 rounded-lg shadow-xl backdrop-blur-md mb-6">
        <p className="text-base sm:text-lg text-[#d4c8a6] mb-4">
          {t('sensorialExperience.theWine.intro')}
        </p>
        <p className="text-base sm:text-lg text-[#d4c8a6]">
          {t('sensorialExperience.theWine.instructions')}
        </p>
      </div>
    </FadeIn>,

    // Section 4: The Wine - Eyes (Formerly Section 3)
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7] flex items-center justify-center">
        <Eye className="mr-3 h-8 w-8 text-[#d4c8a6]" />
        {t('sensorialExperience.theWine.eyes.title')}
      </h2>
      <div className="bg-[#6a6050]/50 p-6 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-base sm:text-lg text-[#d4c8a6]">
          {t('sensorialExperience.theWine.eyes.description')}
        </p>
      </div>
    </FadeIn>,

    // Section 5: The Wine - Nose (Formerly Section 4)
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7] flex items-center justify-center">
        <Search className="mr-3 h-8 w-8 text-[#d4c8a6]" />{' '}
        {/* Assuming Search or similar icon for Nose */}
        {t('sensorialExperience.theWine.nose.title')}
      </h2>
      <div className="bg-[#6a6050]/50 p-6 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-base sm:text-lg text-[#d4c8a6]">
          {t('sensorialExperience.theWine.nose.description')}
        </p>
      </div>
    </FadeIn>,

    // Section 6: The Wine - Mouth (Formerly Section 5)
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#f0e4c7] flex items-center justify-center">
        <Smile className="mr-3 h-8 w-8 text-[#d4c8a6]" />{' '}
        {/* Assuming Smile or similar icon for Mouth */}
        {t('sensorialExperience.theWine.mouth.title')}
      </h2>
      <div className="bg-[#6a6050]/50 p-6 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-base sm:text-lg text-[#d4c8a6]">
          {t('sensorialExperience.theWine.mouth.description')}
        </p>
      </div>
    </FadeIn>,

    // Section 7: Questionnaire (Formerly Section 6)
    <FadeIn delay={0} duration={500} className="w-full max-w-2xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#f0e4c7] text-center">
        {t('sensorialExperience.questionnaire.title')}
      </h2>
      <div className="bg-[#6a6050]/50 p-6 sm:p-8 rounded-lg shadow-xl backdrop-blur-md">
        {submissionStatus !== 'success' && (
          <form
            onSubmit={e => {
              e.preventDefault()
              handleQuestionnaireSubmit()
            }}
            className="space-y-6"
          >
            {/* Liked Wine */}
            <div className="border border-gray-600/50 rounded-md p-4">
              <p className="text-base sm:text-lg text-[#e0d4b6] mb-3">
                {t('sensorialExperience.questionnaire.likedWine')}
              </p>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer text-[#d4c8a6]">
                  <input
                    type="radio"
                    name="likedWine"
                    checked={likedWine === true}
                    onChange={() => setLikedWine(true)}
                    className="form-radio h-5 w-5 text-[#a09078] bg-gray-700 border-gray-600 focus:ring-[#a09078] focus:ring-offset-0"
                  />
                  <span>{t('sensorialExperience.questionnaire.yes')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-[#d4c8a6]">
                  <input
                    type="radio"
                    name="likedWine"
                    checked={likedWine === false}
                    onChange={() => setLikedWine(false)}
                    className="form-radio h-5 w-5 text-[#a09078] bg-gray-700 border-gray-600 focus:ring-[#a09078] focus:ring-offset-0"
                  />
                  <span>{t('sensorialExperience.questionnaire.no')}</span>
                </label>
              </div>
            </div>

            {/* Complex Wine */}
            <div className="border border-gray-600/50 rounded-md p-4">
              <p className="text-base sm:text-lg text-[#e0d4b6] mb-3">
                {t('sensorialExperience.questionnaire.complexWine')}
              </p>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer text-[#d4c8a6]">
                  <input
                    type="radio"
                    name="complexWine"
                    checked={complexWine === true}
                    onChange={() => setComplexWine(true)}
                    className="form-radio h-5 w-5 text-[#a09078] bg-gray-700 border-gray-600 focus:ring-[#a09078] focus:ring-offset-0"
                  />
                  <span>{t('sensorialExperience.questionnaire.yes')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-[#d4c8a6]">
                  <input
                    type="radio"
                    name="complexWine"
                    checked={complexWine === false}
                    onChange={() => setComplexWine(false)}
                    className="form-radio h-5 w-5 text-[#a09078] bg-gray-700 border-gray-600 focus:ring-[#a09078] focus:ring-offset-0"
                  />
                  <span>{t('sensorialExperience.questionnaire.no')}</span>
                </label>
              </div>
            </div>

            {/* Defect Question */}
            <div className="border border-gray-600/50 rounded-md p-4">
              <label
                htmlFor="defectGuess"
                className="block text-base sm:text-lg text-[#e0d4b6] mb-3"
              >
                {t('sensorialExperience.questionnaire.defectQuestion')}
              </label>
              <input
                type="text"
                id="defectGuess"
                value={defectGuess}
                onChange={e => setDefectGuess(e.target.value)}
                className="w-full p-3 bg-[#50463a] border border-gray-600/80 rounded-md text-[#e0d4b6] focus:ring-2 focus:ring-[#a09078] focus:border-[#a09078] placeholder-gray-500"
                placeholder={t('sensorialExperience.questionnaire.yourAnswerPlaceholder')}
              />
            </div>

            {/* User Email */}
            <div className="border border-gray-600/50 rounded-md p-4">
              <label htmlFor="userEmail" className="block text-base sm:text-lg text-[#e0d4b6] mb-3">
                {t('sensorialExperience.questionnaire.yourEmail')}
              </label>
              <input
                type="email"
                id="userEmail"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                className="w-full p-3 bg-[#50463a] border border-gray-600/80 rounded-md text-[#e0d4b6] focus:ring-2 focus:ring-[#a09078] focus:border-[#a09078] placeholder-gray-500"
                placeholder={t('sensorialExperience.questionnaire.emailPlaceholder')}
                required
              />
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#8c7b60] hover:bg-[#a09078] text-white rounded-lg shadow-lg transition-colors duration-300 text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#a09078] focus:ring-offset-2 focus:ring-offset-[#3a3228] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                {submissionStatus === 'submitting'
                  ? t('sensorialExperience.questionnaire.submitting')
                  : t('sensorialExperience.questionnaire.submit')}
              </button>
            </div>
          </form>
        )}

        {/* Submission Status Messages */}
        {submissionStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-700/30 border border-green-500/50 rounded-md text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <p className="text-base sm:text-lg text-green-300">{submissionMessage}</p>
          </div>
        )}
        {submissionStatus === 'error' && submissionMessage && (
          <div className="mt-6 p-4 bg-red-700/30 border border-red-500/50 rounded-md text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-base sm:text-lg text-red-300">{submissionMessage}</p>
          </div>
        )}
      </div>
    </FadeIn>,
  ]

  // Main navigation buttons (Next/Back/Finish)
  const handleNext = () => {
    if (isTransitioning) return

    setIsTransitioning(true)

    if (currentStep === 2) {
      // Corresponds to "Some defects that can be virtues"
      // For the defects section, the internal navigation is used.
      // The main "Next" button should advance to the *next main section*.
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1)
      }
    } else if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
    // Smooth transition effect
    setTimeout(() => setIsTransitioning(false), 500) // Adjust timing as needed
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#3a3228] to-[#1e1a14] p-4 overflow-hidden">
      {/* Main content area */}
      <div
        ref={containerRef}
        className="flex w-full overflow-x-hidden snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sectionContents.map((content, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 snap-center min-h-[calc(100vh-150px)]" // Adjusted min-height for nav
          >
            {isSectionContentVisible && currentStep === index + 1 ? (
              content
            ) : (
              <div className="w-full max-w-2xl">&nbsp;</div>
            )}
          </div>
        ))}
      </div>

      {/* Centered Navigation Buttons */}
      {currentStep > 0 &&
        currentStep < TOTAL_STEPS &&
        currentStep !== 2 && ( // Hide on defects (step 2) and last step (questionnaire)
          <div className="mt-8 mb-4 flex justify-center w-full max-w-md">
            <button
              onClick={handleNext}
              disabled={currentStep === TOTAL_STEPS || isTransitioning}
              className="px-8 py-3 bg-[#8c7b60] hover:bg-[#a09078] text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {t('sensorialExperience.navigation.next')}
            </button>
          </div>
        )}
      {/* Special navigation for Defects section (Step 2) - handled by its own buttons now */}
      {/* The general next button for step 2 will advance to step 3 */}
      {currentStep === 2 && (
        <div className="mt-8 mb-4 flex justify-center w-full max-w-md">
          <button
            onClick={handleNext} // Goes to step 3
            disabled={isTransitioning}
            className="px-8 py-3 bg-[#8c7b60] hover:bg-[#a09078] text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {t('sensorialExperience.navigation.next')}
          </button>
        </div>
      )}

      {/* Step Indicators (optional, can be styled or removed) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentStep === index + 1 ? 'bg-[#f0e4c7] scale-125' : 'bg-gray-500/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default SensorialExperiencePage
