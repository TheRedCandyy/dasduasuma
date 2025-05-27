import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import SensorialExperiencePage from '@/pages/SensorialExperiencePage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import ShippingPage from '@/pages/ShippingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sensorial-experience" element={<SensorialExperiencePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          {/* Add other routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
