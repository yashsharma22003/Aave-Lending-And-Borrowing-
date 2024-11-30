'use client';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Header from '../components/Header';
import Footer from '@/components/Footer';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Toaster } from 'react-hot-toast';

import { config } from '../wagmi';

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();
  return (



    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">
      
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
          
                <Header />
            
                <main className=''>{children}</main>

                <Footer />
             
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <Toaster/>
      </body>
    </html>

  );
}
