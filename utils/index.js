const getSite = () => {
  if (process.env.VERCEL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`; 
};

export { getSite };
