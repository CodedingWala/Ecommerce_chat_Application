import { useState } from 'react'
import { Show, SignInButton, SignUpButton, useAuth, UserButton, useUser } from '@clerk/react'
import './App.css'

function App() {
 const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  
  console.log('Clerk loaded:', isLoaded)
  console.log('User signed in:', isSignedIn)
  console.log('User:', user)
  return (
    <>
     <header>
         <pre>
        Loaded: {String(isLoaded)}<br />
        Signed In: {String(isSignedIn)}<br />
        User ID: {user?.id || 'None'}
      </pre>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode='modal' />
        </Show>
        <Show when="signed-in">
          <UserButton  />
        </Show>
      </header>
    </>
  )
}

export default App
