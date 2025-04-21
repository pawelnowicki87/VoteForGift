

import Calendar from "@/components/components/Callendar";
import Navigation from "@/components/components/Navigation";
import Sidebar from "@/components/components/Sidebar";

export default function Home() {

  return (
    <>
      <Navigation />
      <main className="flex bg-yellow-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <Calendar />
        </div>
      </main>
    </>
  )
}