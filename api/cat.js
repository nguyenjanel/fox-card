export default async function handler(req, res) {
  const cats = await Promise.all(
    Array.from({ length: 50 }, async (_, i) => {
      const data = await fetch(`https://cataas.com/cat?json=true`).then(r => r.json());
      return {
        id: i + 1,
        image: data.url,  // this is the direct URL to the cat image
      };
    })
  );
  res.setHeader("Cache-Control", "max-age=0, s-maxage=1800");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.status(200).json(cats);
}