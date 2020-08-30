import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function Home() {
  const [fileInput, setFileInput] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const [compressRange, setCompressRange] = useState(50);

  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);

  const [downloadLink, setDownloadLink] = useState('');

  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [compressionProcessing, setCompressionProcessing] = useState(true);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    setFileName(acceptedFiles[0].name);
    const size = Math.ceil(acceptedFiles[0].size / 1024);
    setFileSize(size + 'KB');
    setFileInput(acceptedFiles[0]);
    setFilePreview(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const initState = () => {
    setUploadPercent(0);
    setUploadComplete(false);
    setCompressionProcessing(true);
    setCompressedImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileInput) {
      return;
    }
    initState();
    const formData = new FormData();
    formData.append('image', fileInput);
    formData.append('quality', compressRange);
    axios
      .post('/api/compress-image', formData, {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setUploadPercent(percent);
          if (percent === 100) {
            setUploadComplete(true);
          }
        },
      })
      .then((res) => {
        console.log(res);
        setCompressionProcessing(false);
        setCompressedImage(res.data.compressed);
        setCompressedSize(res.data.size);

        const downloadLink = 'data:image/jpeg;base64,' + res.data.compressed;
        setDownloadLink(downloadLink);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container py-4">
      <p className="text-center title-text">This app supports lossy compression</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div {...getRootProps()}>
          <input {...getInputProps()} type="file" />
          {isDragActive ? (
            <p className="container text-center bg-light text-muted p-5  drag-n-drop-container">
              Drop the files here ...
            </p>
          ) : (
            <p className="container text-center bg-light text-muted p-5  drag-n-drop-container">
              Drag or click to select files
            </p>
          )}
        </div>
        <div>
          <small className="d-block">select quality</small>
          <div className="d-flex align-items-center mb-1">
            <input
              style={{ width: 200 }}
              type="range"
              onChange={(e) => {
                if (e.target.value == 0) {
                  setCompressRange(1);
                  return;
                }
                setCompressRange(e.target.value);
              }}
            />
            <small className="ml-1">{compressRange}</small>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-sm btn-primary">
            upload <i className="fas fa-long-arrow-alt-up"></i>
          </button>

          {!!compressedImage && (
            <a href={downloadLink} className="btn btn-sm btn-success" download>
              download <i className="fas fa-long-arrow-alt-down"></i>
            </a>
          )}
        </div>
      </form>
      <div className="row">
        <div className="col-12 col-sm-6" style={{ wordBreak: 'break-all' }}>
          <div>
            <div>
              <strong className="mr-2">image:</strong>
              <span>{fileName}</span>
            </div>
            <div>
              <strong className="mr-2">size:</strong>
              <span>{fileSize}</span>
            </div>
          </div>
          <img src={filePreview} alt="" style={{ width: 300, height: 'auto' }} />
        </div>
        <div className="col-12 col-sm-6" style={{ wordBreak: 'break-all' }}>
          {!!compressedImage && (
            <div>
              <div>
                <div>
                  <strong className="mr-2">image:</strong>
                  <span>{fileName}</span>
                </div>
                <div>
                  <strong className="mr-2">size:</strong>

                  {!!compressedSize && <span>{Math.floor(compressedSize / 1024) + 'KB'}</span>}
                </div>
              </div>
              <img style={{ width: 300, height: 'auto' }} src={`data:image/jpeg;base64,${compressedImage}`} />
            </div>
          )}
          {!compressedImage && (
            <div>
              {!uploadComplete && (
                <div>
                  {uploadPercent > 0 ? (
                    <div>
                      <div className="small w-100 text-right">{uploadPercent + '%'}</div>
                      <div class="progress">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          style={{ width: uploadPercent + '%' }}
                          aria-valuenow={uploadPercent}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}
              {!!uploadComplete && !!compressionProcessing && (
                <div className="w-100 d-flex align-items-center flex-wrap text-muted">
                  <span className="m-2">compressing your image, please wait</span>
                  <span
                    className="spinner-border"
                    style={{ width: '16px', height: '16px', borderWidth: '2px' }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
