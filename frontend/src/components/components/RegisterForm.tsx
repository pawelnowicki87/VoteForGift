'use client'

import { useState } from "react"
import { useRegisterMutation } from "@/store/api/authApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const router = useRouter()
    
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      alert("Hasła się nie zgadzają!")
      return
    }

    try {
      const res = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      }).unwrap()
      console.log("✅ Użytkownik zarejestrowany:", res);
      router.push('/');
    } catch (err) {
      console.error("❌ Błąd rejestracji:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4 text-left">
      <div>
        <Label htmlFor="firstName">Imię</Label>
        <Input id="firstName" value={form.firstName} onChange={handleChange} placeholder="Cezary" className="hover:bg-yellow-50" />
      </div>
      <div>
        <Label htmlFor="lastName">Nazwisko</Label>
        <Input id="lastName" value={form.lastName} onChange={handleChange} placeholder="Pazura" className="hover:bg-yellow-50" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={form.email} onChange={handleChange} type="email" placeholder="grzegorz@gmail.com" className="hover:bg-yellow-50" />
      </div>
      <div>
        <Label htmlFor="password">Hasło</Label>
        <Input id="password" value={form.password} onChange={handleChange} type="password" placeholder="••••••••" className="hover:bg-yellow-50" />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
        <Input id="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" placeholder="••••••••" className="hover:bg-yellow-50" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">
          Zapoznałem/łam się i zgadzam z <a href="#" className="underline">polityką prywatności.</a>
        </Label>
      </div>

      <Button type="submit" className="w-full mt-2 font-bold bg-secondaryColor" disabled={isLoading}>
        {isLoading ? "Rejestrowanie..." : "Stwórz"}
      </Button>

      {error && <p className="text-red-500 text-sm">❌ Błąd rejestracji</p>}
      {isSuccess && <p className="text-green-500 text-sm">✅ Konto utworzone!</p>}
    </form>
  )
}
