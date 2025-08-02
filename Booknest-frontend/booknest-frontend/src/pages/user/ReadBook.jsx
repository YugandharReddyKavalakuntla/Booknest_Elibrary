
// src/pages/user/ReadBook.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import api from '../../api';

export default function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const viewerRef = useRef(); // Ref for full screen

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await api.get(`/books/${id}/pdf`, { responseType: 'blob' });
        const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        setPdfUrl(url);
      } catch {
        setError('Unable to load PDF.');
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [id]);

  const toggleFullScreen = () => {
    const el = viewerRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between mb-2">
        <Button variant="secondary" onClick={() => navigate(-1)}>← Back</Button>
        <Button variant="dark" onClick={toggleFullScreen}>📺 Full Screen</Button>
      </div>

      <div ref={viewerRef} style={{ width: '100%', height: '800px' }}>
        <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
          <p>Your browser does not support viewing PDFs inline. <a href={pdfUrl}>Download PDF</a>.</p>
        </object>
      </div>
    </div>
  );
}
