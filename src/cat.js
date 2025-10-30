export default async function handler(req, res) {
  const catPromises = Array.from({ length: 50 }, (_, i) => {
    return fetch("https://cataas.com/cat?json=true")
      .then(resp => resp.json())
      .then(data => ({
        id: i + 1,                          // sequential ID 1-50
        image: `https://cataas.com/cat/${data.id}?position=center`, // clickable link
      }));
  });

  try {
    const cats = await Promise.all(catPromises);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cats" });
  }
}