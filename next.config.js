module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'hips.hearstapps.com',
      'picsum.photos',
      'labelity-use-dev-images.s3.amazonaws.com',
    ],
  },
};
