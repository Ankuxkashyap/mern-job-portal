
import './App.css'
import Header from './components/Header.jsx' 
import Landing from './components/Landing.jsx'

function App() {


  return (
    <>
     <div value=" relative isolate "> 
        <div className=" grid-background absolute inset-0 -z-10 h-full w-full bg-black/100 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px]">
          <Header />
          <Landing />
      </div>
  </div>
    </>
  )
}

export default App
