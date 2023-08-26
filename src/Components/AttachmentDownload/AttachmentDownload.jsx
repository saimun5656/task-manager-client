/* eslint-disable react/prop-types */
import axios from 'axios';

const AttachmentDownloadButton = ({ taskId, attachmentId, attachmentFileName}) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`https://task-management-server-saimun5656.vercel.app/download-attachment/${taskId}/${attachmentId}`,
      { 
        responseType: 'blob', // Set the response type to 'blob' for binary data
      });

      // Create a URL for the blob data
      const blob = new Blob([response.data], { type: response.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = attachmentFileName;
      link.click();
     
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
  };

  return (
    <button className='ms-5' onClick={handleDownload}>Download </button>
  );
};

export default AttachmentDownloadButton;
