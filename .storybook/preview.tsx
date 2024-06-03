// import '../src/index.css'
// import React from 'react'
// import { HelmetProvider } from 'react-helmet-async'
// import ErrorBoundary from '../src/components/ErrorBoundary'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { AppProvider } from '../src/contexts/app.context.tsx'


// export const parameters = {
//   // actions: { argTypesRegex: '^on[A-Z].*' },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/
//     }
//   }
// }

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false
//     },
//     mutations: {
//       retry: false
//     }
//   }
// })

// export const decorators = [
//   (Story) => (
//     <QueryClientProvider client={queryClient}>
//       <AppProvider>
//         <HelmetProvider>
//           <ErrorBoundary>
//             <Story />
//           </ErrorBoundary>
//         </HelmetProvider>
//       </AppProvider>
//     </QueryClientProvider>
//   )
// ]
