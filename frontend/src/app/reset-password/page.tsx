'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-border">
        <h1 className="text-2xl font-bold text-center mb-2">Resetuj hasło</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Wpisz swój adres e-mail, a wyślemy Ci link do zresetowania hasła.
        </p>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="hover:bg-yellow-50"/>
          </div>

          <Button type="submit" className="w-full mt-2 font-bold bg-secondaryColor text-primaryColor">
            Wyślij link resetujący
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-primaryColor hover:underline">
            ← Powrót do logowania
          </a>
        </div>
      </div>
    </div>
  )
}
