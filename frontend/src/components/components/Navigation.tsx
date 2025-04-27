'use client'
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/store/api/authApi";
import { useAppDispatch, useAppSelector } from "@/store/store/hooks";
import { logout } from "@/store/store/slices/authSlice";
import { LogOut } from "lucide-react";
import { Gift } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [ logoutMutation ] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user)

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutMutation({});
      dispatch(logout());
      router.push('/login');
    }
    catch (error) {
      console.error('Błąd podczas wylogowania:', error);
    }

  };

  const initials = user?.firstName && user?.lastName
  ? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
  : "";

  return (
    <div className="flex justify-between items-center h-16 px-6 text-xl border-b border-black bg-yellow-600 text-navTextColor">
      <div className="flex justify-center items-center gap-3">
        <Gift />
        <h1>Vote For Gift</h1>
      </div>

      <div className="flex justify-center items-center gap-4">

        <p className="text-xl hidden md:block">
          Witaj, {user?.firstName}
        </p>

        <div className="md:hidden bg-black text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>

        <Button onClick={handleLogout} variant="ghost" className="flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline">Wyloguj</span>
        </Button>
      </div>
    </div>
  );
}
