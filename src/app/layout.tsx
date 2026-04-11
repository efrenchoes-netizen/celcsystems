import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CELC Systems | Reparación de PC y Automatización IA en NYC & Long Island',
  description: 'Servicios de reparación de PC ($79-$99), automatización con IA (n8n) desde $350, y mantenimiento mensual ($149/mes) para pequeñas empresas hispanas en NYC y Long Island.',
  keywords: 'reparación pc, servicio técnico, automation n8n, nyc, long island, computadoras, mantenimiento it',
  authors: [{ name: 'CELC Systems', url: 'https://celcsystems.com' }],
  creator: 'CELC Systems',
  publisher: 'CELC Systems',
  metadataBase: new URL('https://celcsystems.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en'
    }
  },
  openGraph: {
    title: 'CELC Systems | Soluciones IT para tu Negocio',
    description: 'Reparación de PC, automatización con IA y mantenimiento mensual. Servicio profesional en NYC y Long Island.',
    url: 'https://celcsystems.com',
    siteName: 'CELC Systems',
    locale: 'es_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CELC Systems - Soluciones IT Profesionales'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CELC Systems | Servicios IT en NYC',
    description: 'Reparación de PC y automatización IA para pequeñas empresas.',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION_ID' // Reemplazar con el ID real
  },
  category: 'Technology',
  classification: 'Business'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'CELC Systems',
              description: 'Reparación de PC, automatización con IA y mantenimiento mensual para pequeñas empresas en NYC y Long Island.',
              url: 'https://celcsystems.com',
              telephone: '+1-929-XXX-XXXX',
              email: 'info@celcsystems.com',
              priceRange: '$79 - $350',
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '40.7128',
                  longitude: '-74.0060'
                },
                geoRadius: '50000'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                addressCountry: 'US'
              },
              serviceType: ['PC Repair', 'IT Automation', 'Monthly Maintenance'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios CELC',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Reparación de PC',
                      description: 'Diagnóstico, limpieza y reparación',
                      price: '89',
                      priceCurrency: 'USD',
                      priceRange: '$79-$99'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Automatización IA',
                      description: 'Flujos automáticos con n8n',
                      price: '350',
                      priceCurrency: 'USD'
                    }
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Mantenimiento Mensual',
                      description: 'Monitoreo continuo',
                      price: '149',
                      priceCurrency: 'USD',
                      billingIncrement: 'month'
                    }
                  }
                ]
              },
              sameAs: [
                'https://facebook.com/celcsystems',
                'https://instagram.com/celcsystems'
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'CELC Systems',
              url: 'https://celcsystems.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://celcsystems.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '¿Cuánto cuesta reparar una PC?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'La reparación de PC cuesta entre $79 y $99 dependiendo del problema. El diagnóstico es gratuito.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '¿Dónde ofrecen servicio?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Servimos a toda el área de NYC incluyendo Queens, Brooklyn, Bronx y Long Island.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '¿Qué es la automatización con n8n?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'n8n es una plataforma de automatización que conecta apps y servicios para crear flujos automáticos. Precio desde $350 setup + $199/mes.'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={geist.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
