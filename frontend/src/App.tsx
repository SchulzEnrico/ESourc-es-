import './App.css'
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

function App() {

  return (
    <>
        <Header />
        <img
            className={"base-chuck"}
            title={"Not a Chuck"}
            src="../src/assets/base_chuck.svg"
            alt="Chuck Icon"
        />
        <Footer />
    </>
  )
}

export default App
