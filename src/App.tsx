import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/nav/TopNav'
import LandingPage from './pages/LandingPage'
import BrowsePage from './pages/BrowsePage'
import KitDetailPage from './pages/KitDetailPage'
import CreatePage from './pages/CreatePage'
import CanvasPage from './pages/CanvasPage'
import CodePreviewPage from './pages/CodePreviewPage'
import { CustomKitProvider } from './context/CustomKitContext'

export default function App() {
  return (
    <CustomKitProvider>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/canvas" element={<CanvasPage />} />
          <Route path="/preview" element={<CodePreviewPage />} />
          <Route path="/kit/:id" element={<KitDetailPage />} />
        </Routes>
      </BrowserRouter>
    </CustomKitProvider>
  )
}
