import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header'
import { CartSidebar } from '@/components/MainMenu/CartSidebar/CartSidebar'
import { HamburguerMenuListTab } from '@/components/MainMenu/HamburguerMenu/HamburguerMenuListTab'
import { SearchTab } from '@/components/MainMenu/Search/SearchTab'
import { Providers } from '@/components/providers'
import '@/styles/globals.css'

import { type ReactNode } from 'react'

export const metadata = {
  title: 'Cravo e Canela',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* @ts-expect-error -> Async Server Component */}
          <Header />
          <HamburguerMenuListTab />
          <SearchTab />
          <CartSidebar />

          {/* <CartSidebar /> */}
          <div
            className={`
            md:px-6 
            lg:px-8  
            xl:px-28 
            2xl:px-28   
            px-4 
            relative 

            pb-6
          `}
          >
            {children}
          </div>
          {/* @ts-expect-error -> Async Server Component */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
