import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Brewcraft Artisan Coffee',
    short_name: 'Brewcraft',
    description: 'A Progressive Web App for artisan coffee brewing',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#d97706',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}