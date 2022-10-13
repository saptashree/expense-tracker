import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./components/index"
import Dashboard from './components/dashboard/index'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Landing />} /> */}
            <Route path='/' element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App