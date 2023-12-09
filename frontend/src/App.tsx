import './App.css'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import Desk from "./components/main/Desk.tsx";


function App() {

  return (
    <div className="app">
        <Header />
        <Desk />
        <Footer />
    </div>
  )
}

export default App
