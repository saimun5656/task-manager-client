/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const UploadForm = ({ taskId }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    console.log('clc');
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('attachment', selectedFile);

      const response = await axios.post(`https://task-management-server-saimun5656.vercel.app/upload/${taskId}`, formData);
      if(response.data.modifiedCount){
        console.log(response.data);
        Swal.fire(
            'Updated',
            `Status has been updated. Uploaded file: ${response.data.attachmentFileName}`,
            'success'
        )
      }
      console.log(response.data); // Assuming your API responds with a message
    } catch (error) {
      console.error('Error uploading attachment:', error);
    }
  };

  return (
    <form className='flex justify-between items-center'>
      <input type="file" onChange={handleFileChange} />
      <button className='border-2 border-gray-500 px-2 py-1 rounded' onClick={handleUpload} type="submit">Upload Attachment</button>
    </form>
  );
};

export default UploadForm;
