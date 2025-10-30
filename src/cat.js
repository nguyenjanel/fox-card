export default async function handler(req, res) {
  const catPromises = Array.from({ length: 50 }, async () => {
    const resp = await fetch("https://cataas.com/cat?json=true");
    const data = await resp.json();
    return {
      id: data.id, // or assign sequential 1-50 if you want
      image: `https://cataas.com${data.url}`, // direct image link
    };
  });

  const cats = await Promise.all(catPromises);
  res.status(200).json(cats);
}