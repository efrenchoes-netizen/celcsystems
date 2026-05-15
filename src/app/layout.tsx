import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  title: {
    default: 'CELC Systems | Expertos en Reparación de PC y Automatización IT en NYC',
    template: '%s | CELC Systems'
  },
  description: 'Servicios profesionales de reparación de PC ($79-$99), automatización con IA (n8n) desde $350, y mantenimiento mensual IT ($149/mes). Especialistas en pequeñas empresas hispanas en NYC y Long Island.',
  keywords: [
    'reparación PC NYC',
    'servicio técnico computadoras Queens',
    'automatización n8n',
    'mantenimiento IT Long Island',
    'reparación laptops Brooklyn',
    'soporte técnico empresas',
    'automatización procesos negocio',
    'reparación computadoras Bronx',
    'servicio IT hispanos NYC',
    'mantenimiento mensual computadoras'
  ],
  authors: [{ name: 'CELC Systems', url: 'https://celcsystems.com' }],
  creator: 'CELC Systems',
  publisher: 'CELC Systems',
  metadataBase: new URL('https://celcsystems.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-US': '/es',
      'en-US': '/en',
      'x-default': '/'
    }
  },
  openGraph: {
    title: 'CELC Systems | Reparación de PC y Automatización IA en NYC',
    description: 'Reparación profesional de computadoras, automatización con IA y mantenimiento IT mensual. Servicio confiable para pequeñas empresas en NYC y Long Island.',
    url: 'https://celcsystems.com',
    siteName: 'CELC Systems',
    locale: 'es_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CELC Systems - Servicios Profesionales de Reparación y Automatización IT'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CELC Systems | Expertos IT en NYC & Long Island',
    description: 'Reparación PC, automatización IA n8n y mantenimiento mensual. ¡Contáctanos!',
    images: ['/og-image.jpg'],
    creator: '@celcsystems'
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
    google: 'GOOGLE_SITE_VERIFICATION_ID'
  },
  category: 'Technology',
  classification: 'Business',
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York, Long Island',
    'geo.position': '40.7128;-74.0060',
    'ICBM': '40.7128, -74.0060'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://celcsystems.com',
              name: 'CELC Systems',
              alternateName: 'CELC Systems IT Services',
              description: 'Servicios profesionales de reparación de PC, automatización con IA (n8n) y mantenimiento mensual IT para pequeñas empresas hispanas en NYC y Long Island.',
              url: 'https://celcsystems.com',
              telephone: '+1-516-800-7626',
              email: 'info@celcsystems.com',
              priceRange: '$$',
              image: 'https://celcsystems.com/logo.png',
              logo: 'https://celcsystems.com/logo.png',
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '40.7128',
                  longitude: '-74.0060'
                },
                geoRadius: '50000',
                name: 'NYC y Long Island'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New York',
                addressRegion: 'NY',
                addressCountry: 'US',
                postalCode: '10001'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '40.7128',
                longitude: '-74.0060'
              },
              serviceType: [
                'Reparación de PC y Laptops',
                'Automatización de Procesos con IA (n8n)',
                'Mantenimiento Mensual IT',
                'Soporte Técnico Remoto',
                'Recuperación de Datos',
                'Instalación de Redes'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios CELC Systems',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Reparación de PC',
                      description: 'Diagnóstico completo, limpieza profunda, reemplazo de componentes y optimización del sistema.',
                      price: '89',
                      priceCurrency: 'USD',
                      priceRange: '$79-$99'
                    },
                    price: '89',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock'
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Automatización IA con n8n',
                      description: 'Configuración de flujos automáticos para emails, formularios, CRM y tareas repetitivas.',
                      price: '350',
                      priceCurrency: 'USD',
                      priceRange: 'Desde $350 + $199/mes'
                    },
                    price: '350',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock'
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Mantenimiento Mensual IT',
                      description: 'Monitoreo continuo 24/7, actualizaciones de seguridad, respaldos automáticos y soporte prioritario.',
                      price: '149',
                      priceCurrency: 'USD',
                      billingIncrement: 'month'
                    },
                    price: '149',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock'
                  }
                ]
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127',
                bestRating: '5',
                worstRating: '1'
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '10:00',
                  closes: '14:00'
                }
              ],
              sameAs: [
                'https://facebook.com/celcsystems',
                'https://instagram.com/celcsystems',
                'https://linkedin.com/company/celcsystems'
              ]
            })
          }}
        />

        {/* Schema.org WebSite */}
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
              },
              inLanguage: ['es', 'en']
            })
          }}
        />

        {/* Schema.org FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '¿Cuánto cuesta reparar una PC en NYC?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'La reparación de PC en CELC Systems cuesta entre $79 y $99 dependiendo del problema. Ofrecemos diagnóstico gratuito y servicio a domicilio en todo NYC y Long Island incluyendo Queens, Brooklyn, Bronx y Staten Island.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '¿Qué áreas de NYC y Long Island cubren?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Servimos toda el área de NYC incluyendo Queens, Brooklyn, Bronx, Manhattan y Staten Island. También cubrimos Nassau y Suffolk County en Long Island. Ofrecemos servicio a domicilio y soporte remoto.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '¿Qué es la automatización con n8n y cuánto cuesta?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'n8n es una plataforma de automatización de código abierto que conecta aplicaciones y servicios para crear flujos de trabajo automáticos. En CELC Systems configuramos automatizaciones para emails, formularios, CRMs y tareas repetitivas. El precio es desde $350 setup inicial + $199/mes de mantenimiento.'
                  }
                },
                {
                  '@type': 'Question',
                  name: '¿Incluyen garantía en las reparaciones?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí, todas nuestras reparaciones incluyen garantía de 30 días. Si el mismo problema ocurre dentro de este período, lo reparamos sin costo adicional. Usamos piezas de calidad y técnicos certificados.'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-[#0f172a] text-slate-100 min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
