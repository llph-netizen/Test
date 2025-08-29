let ideas = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, idea, description } = req.body;
    ideas.push({ name, email, idea, description });
    res.status(200).json({ message: "Idea submitted" });
  } else if (req.method === "GET") {
    res.status(200).json(ideas);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
