// // src/pages/admin/AddBook.jsx

// src/pages/admin/AddBook.jsx

import React, { useState, useRef } from "react";
import api from "../../api";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    genres: [""],
  });
  const [coverFile, setCoverFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const coverRef = useRef(), pdfRef = useRef();

  const handleChange = (e) =>
    setBook({ ...book, [e.target.name]: e.target.value });

  const handleGenreChange = (value, index) => {
    const newGenres = [...book.genres];
    newGenres[index] = value;
    setBook({ ...book, genres: newGenres });
  };

  const addGenreField = () => {
    setBook({ ...book, genres: [...book.genres, ""] });
  };

  const handleCover = (e) => setCoverFile(e.target.files[0]);
  const handlePdf = (e) => setPdfFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Combine all genres into a comma-separated string
    const combinedGenres = book.genres.filter(g => g.trim() !== "").join(",");

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("description", book.description);
    formData.append("genres", combinedGenres);
    formData.append("coverImage", coverFile);
    formData.append("file", pdfFile);

    try {
      await api.post("/books/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Book added successfully!");
      setBook({ title: "", author: "", description: "", genres: [""] });
      setCoverFile(null);
      setPdfFile(null);
      coverRef.current.value = "";
      pdfRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setMessage("❌ Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">Add New Book</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input className="form-control" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" rows={3} value={book.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Genres</label>
          {book.genres.map((g, index) => (
            <input
              key={index}
              type="text"
              className="form-control mb-2"
              value={g}
              onChange={(e) => handleGenreChange(e.target.value, index)}
              placeholder={`Genre ${index + 1}`}
            />
          ))}
          <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addGenreField}>
            ➕ Add another genre
          </button>
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Image</label>
          <input type="file" accept="image/*" ref={coverRef} className="form-control" onChange={handleCover} required />
          {coverFile && <p className="small text-muted">📷 {coverFile.name}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">PDF File</label>
          <input type="file" accept="application/pdf" ref={pdfRef} className="form-control" onChange={handlePdf} required />
          {pdfFile && <p className="small text-muted">📄 {pdfFile.name}</p>}
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Uploading..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}


// import React, { useState, useRef } from "react";
// import api from "../../api";

// export default function AddBook() {
//   const [book, setBook] = useState({
//     title: "",
//     author: "",
//     description: "",
//     genres: [],
//   });
//   const [coverFile, setCoverFile] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const coverRef = useRef(), pdfRef = useRef();

//   const availableGenres = [
//     "FICTION", "NONFICTION", "TECHNOLOGY", "HISTORY", "BIOGRAPHY", "SELFHELP"
//   ];

//   const handleChange = (e) =>
//     setBook({ ...book, [e.target.name]: e.target.value });

//   const handleGenreToggle = (genre) => {
//     setBook((prev) => ({
//       ...prev,
//       genres: prev.genres.includes(genre)
//         ? prev.genres.filter((g) => g !== genre)
//         : [...prev.genres, genre],
//     }));
//   };

//   const handleCover = (e) => setCoverFile(e.target.files[0]);
//   const handlePdf = (e) => setPdfFile(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", book.title);
//     formData.append("author", book.author);
//     formData.append("description", book.description);
//     book.genres.forEach((genre) => formData.append("genres", genre));
//     formData.append("coverImage", coverFile);
//     formData.append("file", pdfFile);

//     try {
//       await api.post("/books/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("✅ Book added successfully!");
//       setBook({ title: "", author: "", description: "", genres: [] });
//       setCoverFile(null);
//       setPdfFile(null);
//       coverRef.current.value = "";
//       pdfRef.current.value = "";
//     } catch (err) {
//       console.error("Upload error:", err.response?.data || err.message);
//       setMessage("❌ Failed to add book.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h3 className="mb-4">Add New Book</h3>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="mb-3">
//           <label className="form-label">Title</label>
//           <input className="form-control" name="title" value={book.title} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Author</label>
//           <input className="form-control" name="author" value={book.author} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea className="form-control" name="description" rows={3} value={book.description} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Genres</label>
//           <div className="d-flex flex-wrap gap-2">
//             {availableGenres.map((genre) => (
//               <div className="form-check" key={genre}>
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   id={genre}
//                   checked={book.genres.includes(genre)}
//                   onChange={() => handleGenreToggle(genre)}
//                 />
//                 <label className="form-check-label" htmlFor={genre}>
//                   {genre}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Cover Image</label>
//           <input type="file" accept="image/*" ref={coverRef} className="form-control" onChange={handleCover} required />
//           {coverFile && <p className="small text-muted">📷 {coverFile.name}</p>}
//         </div>
//         <div className="mb-3">
//           <label className="form-label">PDF File</label>
//           <input type="file" accept="application/pdf" ref={pdfRef} className="form-control" onChange={handlePdf} required />
//           {pdfFile && <p className="small text-muted">📄 {pdfFile.name}</p>}
//         </div>
//         <button type="submit" className="btn btn-success" disabled={loading}>
//           {loading ? "Uploading..." : "Add Book"}
//         </button>
//       </form>
//     </div>
//   );
// }
