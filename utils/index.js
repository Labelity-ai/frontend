const getSite = () => {
  if (typeof window !== "undefined" || !process.env.VERCEL)
    return `http://localhost:3000`;
  return `https://${process.env.VERCEL_URL}`;
};

export { getSite };
