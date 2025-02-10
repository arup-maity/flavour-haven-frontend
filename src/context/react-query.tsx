'use client'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function QureyProvider({ children }) {
   return (
      // Provide the client to your App
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   )
}

export default QureyProvider