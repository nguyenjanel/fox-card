export default function handler(req, res) {
  const foxes = Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;
    return {
      id,
      image: `https://randomfox.ca/images/${(id % 122) + 1}.jpg`,
    };
  });

  res.setHeader("Cache-Control", "max-age=0, s-maxage=1800");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  res.status(200).json(foxes);
}