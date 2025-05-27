/**
 * Utility functions to lock and unlock page scrolling
 */

// Variable to keep track of the original body style
let originalBodyStyle: {
  overflow?: string
  position?: string
  width?: string
  height?: string
  top?: string
} | null = null

// Reference counter for scroll locks
let lockCount = 0

/**
 * Lock scrolling on the page
 * This prevents the page from being scrolled while modals/overlays are active
 */
export const lockScroll = (): void => {
  lockCount++
  if (lockCount === 1) {
    originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      height: document.body.style.height,
      top: document.body.style.top,
    }
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    document.body.style.top = `-${scrollY}px`
  }
}

/**
 * Unlock scrolling on the page
 * This restores normal scrolling behavior after a modal/overlay is closed
 */
export const unlockScroll = (): void => {
  if (lockCount <= 0) {
    if (document.body.style.position === 'fixed') {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
      originalBodyStyle = null
    }
    lockCount = 0
    return
  }

  lockCount--

  if (lockCount === 0) {
    if (originalBodyStyle) {
      document.body.style.overflow = originalBodyStyle.overflow || ''
      document.body.style.position = originalBodyStyle.position || ''
      document.body.style.width = originalBodyStyle.width || ''
      document.body.style.height = originalBodyStyle.height || ''
      const scrollY = originalBodyStyle.top ? parseInt(originalBodyStyle.top || '0', 10) * -1 : 0
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
      originalBodyStyle = null
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.body.style.top = ''
    }
  }
}

/**
 * Force unlock scrolling (e.g., for emergencies or specific transitions)
 * This should be used sparingly.
 */
export const forceUnlockScroll = (_caller?: string): void => {
  if (originalBodyStyle) {
    document.body.style.overflow = originalBodyStyle.overflow || ''
    document.body.style.position = originalBodyStyle.position || ''
    document.body.style.width = originalBodyStyle.width || ''
    document.body.style.height = originalBodyStyle.height || ''
    const scrollY = originalBodyStyle.top ? parseInt(originalBodyStyle.top || '0', 10) * -1 : 0
    document.body.style.top = ''
    window.scrollTo(0, scrollY)
    originalBodyStyle = null
  } else {
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.width = ''
    document.body.style.height = ''
    document.body.style.top = ''
  }
  lockCount = 0
}
