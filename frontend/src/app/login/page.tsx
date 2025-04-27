'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from 'next/navigation'

import { Facebook, GoalIcon } from "lucide-react"
import { useState } from "react"
import { useLoginMutation } from "@/store/api/authApi"
import { setUser } from "@/store/store/slices/authSlice"
import { useAppDispatch } from "@/store/store/hooks"

type FormData = {
  email: string,
  password: string
}

type CustomError = {
  status: number;
  data: {
    message: string;
  };
};

export default function LoginPage() {
  const [ form, setForm ] = useState<FormData>({email: '', password: ''})
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();

  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await login(form).unwrap();
      
      dispatch(setUser({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
      }));
  
      router.push('/');
    }
    catch (error) {
      console.log("Błąd logowania: ", error);
    }
  }

  const getErrorMessage = () => {
    if (!error) return null;
  
    const err = error as CustomError;
  
    if (err.status === 400) {
      return "Nieprawidłowy email lub hasło.";
    }
  
    if (err.status === 403) {
      return "Konto nie zostało aktywowane. Sprawdź e-mail.";
    }
  
    return "Wystąpił nieznany błąd. Spróbuj ponownie.";
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Logowanie</h1>

        <div className="space-y-3 ">
          <Button variant="outline" className="w-full flex gap-2 justify-center hover:bg-yellow-50">
            <Facebook className="h-4 w-4" />
            Zaloguj sie kontem <span className="font-bold">Facebook</span>
          </Button>
          <Button variant="outline" className="w-full flex gap-2 justify-center hover:bg-yellow-50">
            <GoalIcon className="h-4 w-4 text-red-500" />
            Zaloguj się z <span className="font-bold">Google</span>
          </Button>
        </div>

        {/* Separator */}
        <div className="my-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">albo</span>
          <Separator className="flex-1" />
        </div>

        {/* Email login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="grzegorz@gmail.com" 
              className="hover:bg-yellow-50"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Hasło</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="hover:bg-yellow-50"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" >Zapamiętaj mnie</Label>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-2  font-bold bg-secondaryColor">
            Zaloguj
          </Button>
          {error && <p className="text-red-500 text-sm mt-2">❌ {getErrorMessage()}</p>}

        </form>
        <div className="flex justify-between items-center mt-4 text-sm">
          <a href="/reset-password" className="text-primaryColor hover:underline">
            Zapomniałeś hasła?
          </a>
          <a href="/register" className="text-muted-foreground hover:underline">
            Nie masz konta? <span className="text-primaryColor font-semibold">Zarejestruj się</span>
          </a>
        </div>
      </div>
      
    </div>
  )
}
