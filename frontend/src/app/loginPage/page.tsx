'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

import { Github, GoalIcon } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-lg border border-border bg-white">
        <h1 className="text-2xl font-bold text-center mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Welcome user, please sign in to continue
        </p>

        {/* Social buttons */}
        <div className="space-y-3 ">
          <Button variant="outline" className="w-full flex gap-2 justify-center  font-bold">
            <Github className="h-4 w-4" />
            Sign In With GitHub
          </Button>
          <Button variant="outline" className="w-full flex gap-2 justify-center  font-bold">
            <GoalIcon className="h-4 w-4 text-red-500" />
            Sign In With Google
          </Button>
        </div>

        {/* Separator */}
        <div className="my-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">Or</span>
          <Separator className="flex-1" />
        </div>

        {/* Email login */}
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember Me</Label>
          </div>

          <Button type="submit" className="w-full mt-2  font-bold bg-secondaryColor">
            Sign In With Email And Password
          </Button>
        </form>
      </div>
    </div>
  )
}
