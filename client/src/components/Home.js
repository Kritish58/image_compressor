import React, { useState } from 'react';

function Home() {
  const [fileInput, setFileInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', fileInput);
  };

  return (
    <div>
      <h4>we support both lossless and lossy compression</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input type="file" onChange={(e) => setFileInput(e)} />
        </div>
      </form>
    </div>
  );
}

export default Home;
