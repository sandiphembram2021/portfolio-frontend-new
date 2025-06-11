import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '../contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sandip Hembram - ML Engineer | Backend Developer | UI/UX Designer',
  description: 'Personal portfolio of Sandip Hembram showcasing ML engineering, backend development, and UI/UX design projects. Specializing in PyTorch, TensorFlow, Flask, and modern web technologies.',
  keywords: 'ML Engineer, Backend Developer, UI/UX Designer, PyTorch, TensorFlow, Flask, API Integration, LLM Integration, MySQL, React, Next.js',
  authors: [{ name: 'Sandip Hembram', email: 'sandiphembram2021@gmail.com' }],
  creator: 'Sandip Hembram',
  publisher: 'Sandip Hembram',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sandiphembram.dev',
    title: 'Sandip Hembram - ML Engineer | Backend Developer | UI/UX Designer',
    description: 'Personal portfolio showcasing ML engineering, backend development, and UI/UX design projects.',
    siteName: 'Sandip Hembram Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sandip Hembram Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandip Hembram - ML Engineer | Backend Developer | UI/UX Designer',
    description: 'Personal portfolio showcasing ML engineering, backend development, and UI/UX design projects.',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sandip Hembram",
              "jobTitle": "ML Engineer | Backend Developer | UI/UX Designer",
              "email": "sandiphembram2021@gmail.com",
              "telephone": "+91-9832382762",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://sandiphembram.dev",
              "sameAs": [
                "https://linkedin.com/in/sandip-hembram-400099261",
                "https://github.com/sandiphembram2021"
              ],
              "knowsAbout": [
                "Machine Learning",
                "Backend Development",
                "UI/UX Design",
                "PyTorch",
                "TensorFlow",
                "Flask",
                "API Integration",
                "LLM Integration"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Educational Institution"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
          
          {/* Global Scripts */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Smooth scrolling for anchor links
                document.addEventListener('DOMContentLoaded', function() {
                  const links = document.querySelectorAll('a[href^="#"]');
                  links.forEach(link => {
                    link.addEventListener('click', function(e) {
                      e.preventDefault();
                      const target = document.querySelector(this.getAttribute('href'));
                      if (target) {
                        target.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    });
                  });
                });
                
                // Add loading states for forms
                window.addLoadingState = function(button, isLoading) {
                  if (isLoading) {
                    button.disabled = true;
                    button.innerHTML = button.innerHTML.replace(/Send Message|Download CV/, 'Loading...');
                    button.classList.add('opacity-75', 'cursor-not-allowed');
                  } else {
                    button.disabled = false;
                    button.innerHTML = button.innerHTML.replace('Loading...', button.dataset.originalText || 'Send Message');
                    button.classList.remove('opacity-75', 'cursor-not-allowed');
                  }
                };
              `
            }}
          />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
