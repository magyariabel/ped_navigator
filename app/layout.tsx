import './globals.css'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Positive Energy Design Navigator',
    description: 'Navigate through stakeholders, intervention points, KPIs, and tools for Positive Energy Design',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Layout>{children}</Layout>
            </body>
        </html>
    )
}