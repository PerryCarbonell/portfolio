import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  )
}
