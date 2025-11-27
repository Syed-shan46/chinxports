import React, { useState } from 'react';

const BulkUpload = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append('images', file);
    }

    try {
      const res = await fetch('http://10.61.32.157:3000/api/products/bulk-upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResults(data.products || []);
    } catch (err) {
      alert('Upload failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className='mt-5 pt-5'>Bulk Product Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <div>
        {results.map((item, idx) => (
          <div key={idx} style={{ margin: '1em 0', border: '1px solid #ccc', padding: '1em' }}>
            <strong>{item.filename}</strong>
            <pre>{item.aiData}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkUpload;