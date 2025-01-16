"use client";

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  async function handleUpload() {
    if (!file) {
      setMessage('No file selected');
      return;
    }
    try {
      // Retrieve token from localStorage (or however you stored it after login)
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in (no token found)');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Assuming your Nest route is POST http://localhost:3000/api/media/upload
      // and you have setGlobalPrefix('api') + @Controller('media') + @Post('upload')
      const res = await fetch('http://localhost:3000/api/media/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(`File uploaded successfully! Path: ${data.filePath}`);
      } else {
        setMessage(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Something went wrong');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Upload</h1>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
}