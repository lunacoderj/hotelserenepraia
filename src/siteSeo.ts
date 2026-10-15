export const PRIMARY_DOMAIN = 'https://www.hotelserenepraia.in';

export const siteSeo = {
  primaryDomain: PRIMARY_DOMAIN,
  siteName: 'Hotel Serene Praia',
  defaultTitle: 'Hotel Serene Praia | Best Beach Hotel in Rushikonda, Visakhapatnam',
  defaultDescription:
    'Hotel Serene Praia is the best beach hotel near Rushikonda Beach, Visakhapatnam. Enjoy luxury sea-view rooms, premium suites, grand banquet hall, and world-class coastal hospitality. Book online or via WhatsApp.',
  canonicalUrl: (path: string = '') => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${PRIMARY_DOMAIN}${cleanPath === '/' ? '' : cleanPath}`;
  },
};
