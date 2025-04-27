'use client'

import { useState } from "react"
import RegisterForm from "@/components/components/RegisterForm"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Facebook, MailCheck } from "lucide-react"

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-border text-center">
        {!isSubmitted ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">Stwórz nowe konto</h1>

            <div className="space-y-3">
              <Button variant="outline" className="w-full flex gap-2 justify-center font-bold hover:bg-yellow-50">
                <Facebook className="h-4 w-4 text-red-500" />
                Zarejestruj się kontem <span className="font-bold">Facebook</span>
              </Button>
              <Button variant="outline" className="w-full flex gap-2 justify-center font-bold hover:bg-yellow-50">
                Zarejestruj się kontem <span className="font-bold">Google</span>
              </Button>
            </div>

            {/* Separator */}
            <div className="my-6 flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-muted-foreground text-xs">albo</span>
              <Separator className="flex-1" />
            </div>

            <RegisterForm onSuccess={() => setIsSubmitted(true)} />

            <a href="/login" className="text-muted-foreground  hover:underline ">
              Masz już konto? <span className="text-primaryColor font-semibold">Zaloguj się!</span>
            </a>
          </>
        ) : (
          <div className="space-y-4">
            <MailCheck className="h-10 w-10 text-green-600 mx-auto" />
            <h2 className="text-xl font-semibold">Konto zostało utworzone</h2>
            <p className="text-sm text-muted-foreground">
              Sprawdź swoją skrzynkę e-mail i kliknij w link aktywacyjny, aby aktywować konto.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
