'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Facebook } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-border text-center">
        <h1 className="text-2xl font-bold text-center mb-2">Stwórz nowe konto</h1>

        <div className="space-y-3">
        <Button variant="outline" className="w-full flex gap-2 justify-center font-bold hover:bg-yellow-50">
            <Facebook className="h-4 w-4 text-red-500" />
            Zarejestruj się kontem <span className="font-bold">Facebook</span>
          </Button>
          <Button variant="outline" className="w-full flex gap-2 justify-center font-bold hover:bg-yellow-50">
            {/* <Google className="h-4 w-4" /> */}
            Zarejestruj się kontem <span className="font-bold">Google</span>
          </Button>

        </div>

        {/* Separator */}
        <div className="my-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">albo</span>
          <Separator className="flex-1" />
        </div>

        {/* Registration form */}
        <form className="space-y-4 mb-4">
          <div>
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input id="name" type="text" placeholder="Cezary Pazura" className="hover:bg-yellow-50"/>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="grzegorz@gmail.com" className="hover:bg-yellow-50" />
          </div>
          <div>
            <Label htmlFor="password">Hasło</Label>
            <Input id="password" type="password" placeholder="••••••••" className="hover:bg-yellow-50"/>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" className="hover:bg-yellow-50"/>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              Zapoznałem/łam się i zgadzam z <a href="#" className="underline">polityką prywatności.</a>
            </Label>
          </div>

          <Button type="submit" className="w-full mt-2 font-bold bg-secondaryColor">
            Stwórz
          </Button>
        </form>
        <a href="/register" className="text-muted-foreground  hover:underline ">
            Masz już konto? <span className="text-primaryColor font-semibold">Zaloguj się!</span>
        </a>
      </div>
    </div>
  )
}
