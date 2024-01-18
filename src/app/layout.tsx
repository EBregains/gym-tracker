import type { Metadata } from 'next'
import { DMSans } from '@/ui/fonts';
import './globals.css'
 
export const metadata: Metadata = {
  title: {
    template: '%s | Gym Tracker',
    default: 'Gym Tracker',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${DMSans.className} antialised text-text-100`}>
        <main className="flex flex-col items-center justify-center bg-background-100">
          <div className='grid grid-cols-4 gap-5 min-w-[325px] h-screen p-[25px] bg-background-100 '>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
