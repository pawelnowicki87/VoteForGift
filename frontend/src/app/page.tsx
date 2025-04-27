'use client'


import Calendar from "@/components/components/Callendar";
import Navigation from "@/components/components/Navigation";
import Sidebar from "@/components/components/Sidebar";
import { useAppSelector } from "@/store/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter();

  useEffect(() => {
    if(!user) {
      router.push('/login');
    }
  }, [user, router])

  return (
    <>
      {user && (
        <>
          <Navigation />
          <main className="flex bg-yellow-100">
            <Sidebar />
            <div className="flex-1 p-6">
              <Calendar />
            </div>
          </main>
        </>
      )}
    </>
  )
} 