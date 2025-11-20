import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import Note from './components/Note'
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();
  const [refreshToken, setRefreshToken] = useState(0)

  const handleNoteAdded = () => {
    // Trigger a re-fetch of notes in the Card component
    setRefreshToken((prev) => prev + 1)
  }

  const isAuthenticated = auth.isAuthenticated
  const accessToken = auth.user?.access_token ?? ''
  const userEmail = auth.user?.profile?.email ?? auth.user?.profile?.sub ?? ''
  const logoutRedirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI ?? window.location.origin

  const handleSignIn = () => {
    auth.signinRedirect().catch((err) => {
      console.error('Error redirecting to sign in', err)
    })
  }

  const handleSignOut = () => {
    auth
      .signoutRedirect({ post_logout_redirect_uri: logoutRedirectUri })
      .catch((err) => {
        console.warn('Falling back to local sign-out', err)
        auth.removeUser()
      })
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {/* Top navbar */}
        <header className="border-b border-white/60 bg-white/80 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 border border-blue-100 text-sm font-semibold">
                N
              </span>
              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-900">
                  iNoteBook
                </p>
                <p className="text-xs text-slate-500">
                  Lightweight notes powered by AWS
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <div className="text-right">
                  <p className="text-xs text-slate-500 leading-tight">
                    Signed in as
                  </p>
                  <p className="text-sm font-medium text-slate-900 max-w-[180px] truncate">
                    {userEmail}
                  </p>
                </div>
              )}
              <button
                onClick={isAuthenticated ? handleSignOut : handleSignIn}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {auth.isLoading
                  ? 'Checking session...'
                  : isAuthenticated
                    ? 'Sign out'
                    : 'Sign in'}
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
          {auth.isLoading && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 text-sm text-slate-500">
              Validating your Cognito session...
            </div>
          )}

          {auth.error && (
            <div className="bg-red-50 border border-red-100 text-red-700 rounded-2xl p-4 text-sm">
              <p className="font-medium mb-1">Authentication error</p>
              <p>{auth.error?.message ?? 'Something went wrong.'}</p>
              <button
                onClick={() => auth.signinRedirect()}
                className="mt-3 inline-flex items-center rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-100 transition"
              >
                Retry sign in
              </button>
            </div>
          )}

          {!auth.isLoading && !auth.error && !isAuthenticated && (
            <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Secure your notes with Cognito
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Sign in to create, view, and manage your notes. We use AWS Cognito
                to keep your data protected.
              </p>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Sign in with Cognito
              </button>
            </div>
          )}

          {isAuthenticated && !auth.error && (
            <>
              {/* Create Note Container */}
              <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight text-slate-900">
                      New note
                    </h2>
                    <p className="text-xs text-slate-500">
                      Title and description are required.
                    </p>
                  </div>
                </div>
                <Note onNoteAdded={handleNoteAdded} accessToken={accessToken} />
              </section>

              {/* Notes List */}
              <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-semibold tracking-tight text-slate-900">
                      Your notes
                    </h2>
                  </div>
                </div>
                <div className="mt-2">
                  <Card refreshToken={refreshToken} accessToken={accessToken} />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App
