'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { RootStoreProvider } from '../stores';
import { RootStore } from '../stores/RootStore';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/graphql/client';

const inter = Inter({ subsets: ['latin'] });

// Initialize root store instance outside component to maintain singleton pattern
const rootStore = new RootStore();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client = {apolloClient}>
            <RootStoreProvider value={rootStore}>
              {children}
            </RootStoreProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}

// Re-export metadata
