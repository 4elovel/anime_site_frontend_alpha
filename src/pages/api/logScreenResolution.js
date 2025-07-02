export default function handler(req, res) {
  if (req.method === "POST") {
    const { width, height } = req.body;
    console.log(`Screen resolution: ${width}x${height}`);
    res.status(200).json({ message: "Resolution logged" });
  } else {
    res.status(405).json({ message: "Only POST requests allowed" });
  }
}