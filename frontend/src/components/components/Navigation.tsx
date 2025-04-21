'use client'
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Gift } from 'lucide-react';

export default function Navbar() {
  const name = "Anna Nowak";
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex justify-between items-center h-16 px-6 text-xl border-b border-black bg-yellow-600 text-navTextColor">
      <div className="flex justify-center items-center gap-3">
        <Gift />
        <h1>Vote For Gift</h1>
      </div>

      <div className="flex justify-center items-center gap-4">

        <p className="text-xl hidden md:block">
          Witaj, <span className="font-bold">{name.split(' ')[0]}</span>
        </p>

        <div className="md:hidden bg-black text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>

        <Button variant="ghost" className="flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          <span className="hidden md:inline">Wyloguj</span>
        </Button>
      </div>
    </div>
  );
}
