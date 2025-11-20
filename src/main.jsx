import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from 'react-oidc-context'

const AUTHORITY = 'https://ap-south-10nrxzkxij.auth.ap-south-1.amazoncognito.com'
const CLIENT_ID = '4raq0f41c4i20useo2nbtqb7ae'
const REDIRECT_URI = 'https://main.d38ejrjc1ph3il.amplifyapp.com'
const POST_LOGOUT_REDIRECT_URI = 'https://main.d38ejrjc1ph3il.amplifyapp.com'

const cognitoAuthConfig = {
  authority: AUTHORITY,
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  post_logout_redirect_uri: POST_LOGOUT_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid email profile',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
