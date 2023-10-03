import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Projeto ViaCEP',
    description: 'Projeto de busca de CEP utilizando a API do ViaCEP',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
