import Header from "./components/header"
import Hero from "./components/hero"
import PopularDestinations from "./components/PopularDestinations"
import Services from "./components/Services"

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden ">
      <Header />
      
      <main className="flex-1 overflow-y-auto">
        <Hero />
        <PopularDestinations />
        <Services />
      </main>
    </div>
  )
}