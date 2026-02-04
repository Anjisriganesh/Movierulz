import { useState } from "react";
import axios from "axios";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [times, setTimes] = useState("");
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("times", JSON.stringify(times.split(","))); // split by comma
    formData.append("price", JSON.stringify({ A: 250, B: 180, C: 120 }));
    formData.append("poster", poster);
    formData.append("banner", banner);

    try {
      const res = await axios.post("/api/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Movie uploaded successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre (Comedy, Drama)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <textarea
          placeholder="Story / Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Show Times (10:00,13:00,18:00)"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
        />
        <label>Poster Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setPoster(e.target.files[0])} required />
        <label>Banner Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files[0])} required />
        <button type="submit">Upload Movie</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
