import cats from '../../mock-data/cats.json';

export default function handler(req, res) {
  res.status(200).json(cats);
}