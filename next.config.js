const prismic = require("@prismicio/client");

const sm = require("./sm.json");

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return {
    reactStrictMode: true,
    i18n: {
      // These are all the locales you want to support
      locales,
      // This is the default locale
      defaultLocale: locales[0],
    },
    experimental: {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.prismic.io',
            port: '',
            pathname: '/ofora/**',
          },
        ],
      },
    }
  };
};

module.exports = nextConfig;
