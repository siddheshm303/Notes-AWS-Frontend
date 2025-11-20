import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "react-oidc-context";

const authority =
  import.meta.env.VITE_COGNITO_AUTHORITY ??
  'https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_0nrxzkXIj'
const clientId =
  import.meta.env.VITE_COGNITO_CLIENT_ID ?? '4g3kuo84dn211bpb9hrma9mg6d'
const redirectUri =
  import.meta.env.VITE_COGNITO_REDIRECT_URI ?? window.location.origin
const responseType = import.meta.env.VITE_COGNITO_RESPONSE_TYPE ?? 'code'
const scope = import.meta.env.VITE_COGNITO_SCOPE ?? 'email openid phone'

const cognitoAuthConfig = {
  authority,
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: responseType,
  scope,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
