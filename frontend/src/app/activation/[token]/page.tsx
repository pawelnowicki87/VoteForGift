'use client'

import { useParams } from 'next/navigation'
import { useActivateQuery } from '@/store/api/authApi'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function ActivationPage() {
  const { token } = useParams() as { token: string }

  const { isLoading, isError } = useActivateQuery(token)

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-border text-center space-y-4">
        {isLoading && (
          <>
            <Loader2 className="h-8 w-8 text-yellow-500 animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Aktywuję konto...</p>
          </>
        )}

        {!isLoading && !isError && (
          <>
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h1 className="text-2xl font-bold">Konto zostało aktywowane!</h1>
            <p className="text-sm text-muted-foreground">
              Możesz teraz się zalogować i korzystać z aplikacji Vote For Gift.
            </p>
            <Separator />
            <a href="/login">
              <Button className="w-full font-bold bg-secondaryColor mt-4">
                Przejdź do logowania
              </Button>
            </a>
          </>
        )}

        {isError && (
          <>
            <XCircle className="w-12 h-12 text-red-600 mx-auto" />
            <h1 className="text-2xl font-bold">Nie udało się aktywować konta</h1>
            <p className="text-sm text-muted-foreground">
              Link może być nieprawidłowy lub konto zostało już aktywowane.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
