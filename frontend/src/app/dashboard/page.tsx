'use client'


import Calendar from "@/components/components/Callendar";
import Navigation from "@/components/components/Navigation";
import Sidebar from "@/components/components/Sidebar";
import { useDashboardQuery } from "@/store/api/authApi";
import { useAppSelector } from "@/store/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();
  
    const { error, isLoading } = useDashboardQuery();
  
    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);
  
    if (!user) {
        return <p className="p-6 text-gray-600">Sprawdzanie sesji użytkownika...</p>;
      } // nie renderujemy niczego do czasu przekierowania
  
    if (isLoading) {
      return <p className="p-6 text-lg">Ładowanie danych z dashboardu...</p>;
    }
  
    if (error) {
      return (
        <div className="p-6 text-red-600">
          Wystąpił błąd podczas ładowania dashboardu: {JSON.stringify(error)}
        </div>
      );
    }
  
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
    );
  }