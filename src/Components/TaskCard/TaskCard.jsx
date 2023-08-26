/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BiSolidLayer } from "react-icons/bi";
import { TbClipboardText, TbMessages } from "react-icons/tb";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UploadForm from "../FileUploader/FileUploader";
import AttachmentDownloadButton from "../AttachmentDownload/AttachmentDownload";
const TaskCard = ({ task, idx }) => {
    const {
        _id,
        clientName,
        clienImg,
        clientImg,
        numOfTasksGiven,
        numOfTasksCompleted,
        attachments,
        status: initialStatus,

    } = task
    const [status, setStatus] = useState(initialStatus);
    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const modalId = `my_modal_${_id}`;
    const statusOptions = [
        "Incomplete",
        "ToDo",
        "Doing",
        "UnderReview",
        "Completed"
    ];

    const handleStatusChange = async (newStatus) => {
        try {
            console.log('handle');
            const response = await axios.put(`https://task-management-server-saimun5656.vercel.app/update-status/${_id}`, {
                newStatus,
            });
            setStatus(newStatus);
            setShowStatusOptions(false); // Close the dropdown after selection
            console.log(response.data.modifiedCount);
            if (response.data) {
                Swal.fire(
                    'Updated',
                    'Status has been updated',
                    'success'
                )
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    console.log(task, clienImg);

    return (
        <div className="bg-[white] p-4 rounded-md space-y-5 hover:shadow-lg  m-3">
            <div id="card-header" className="flex justify-between">
                <div className="flex items-center  gap-3">
                    <img className="w-12 h-12 rounded-full object-cover" src={clienImg || clientImg || 'https://i.ibb.co/ckcQGV0/kirill-balobanov-s-RPb-Vu7-FOsw-unsplash.jpg'} alt="client-img" />
                    <p>{clientName}</p>
                </div>
                <div className="flex items-center  gap-3">
                    <img className="w-12 h-12 rounded-full object-cover" src="https://i.ibb.co/f08hWdC/WIN-20230513-23-50-47-Pro-2.jpg" alt="client-img" />
                    <p>Saimun</p>
                </div>
            </div>

            <div className="flex items-center gap-5" id="card-body">
                <p className="grow whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-normal duration-1000 max-h-6 hover:max-h-[150px]">
                    <BiSolidLayer className="inline text-2xl me-2" />Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores voluptatum culpa odit amet ipsum unde, deleniti recusandae quibusdam ut ea quidem sunt perspiciatis. Ducimus quo, molestias earum sunt dolor impedit?
                </p>
                <p className="flex items-center bg-[#ddd] p-[3px] rounded-sm h-6">
                    <TbClipboardText className=" me-1" />{numOfTasksCompleted}/{numOfTasksGiven}
                </p>
            </div>

            <div id="card-footer" className="flex justify-between items-center">
                <img className="w-8 h-8 rounded-full object-cover" src="https://i.ibb.co/Mp1CT22/aiony-haust-3-TLl-97-HNJo-unsplash.jpg" alt="" />
                <img className="w-8 h-8 rounded-full object-cover" src="https://i.ibb.co/ckcQGV0/kirill-balobanov-s-RPb-Vu7-FOsw-unsplash.jpg" alt="" />
                <p className="w-8 h-8 rounded-full bg-[#ddd] flex items-center justify-center font-semibold">{numOfTasksGiven}+</p>
                <p className="text-xl"><TbMessages className="inline text-2xl me-1" />{numOfTasksCompleted + 3}</p>
                <p onClick={() => document.getElementById(modalId).showModal()} className="text-xl cursor-pointer hover:text-[#b2353b]">
                    <GrAttachment className="inline hover:text-[#b2353b] text-2xl me-1" />{attachments.length}
                </p>
                <p className="text-lg flex items-center"><MdOutlineCalendarMonth className="text-xl me-1" />30-11-22</p>


                <div className="relative">
                    <button
                        className="bg-[#ddd] rounded-md px-3 py-1"
                        onClick={() => setShowStatusOptions(!showStatusOptions)}
                    >
                        Mark Status
                    </button>
                    {showStatusOptions && (
                        <div className="absolute top-10 bg-white border rounded-md shadow-md z-10">
                            <ul>
                                {statusOptions.map(option => (
                                    <li
                                        key={option}
                                        onClick={() => handleStatusChange(option)}
                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            {/* Open the modal using ID.showModal() method */}

            <div className='modal-boxs'>
                <dialog id={modalId} className="modal bg-[#00000088]">
                    <form method="dialog" className="modal-box bg-gray-300">
                        <h3 className="font-bold text-lg">{clientName}</h3>
                        <UploadForm taskId={_id}></UploadForm>

                        <ul className="space-y-4">
                            {attachments.map((attachment, index) => (
                                <li key={index} className="flex justify-between">

                                    <p>{index + 1}.{attachment.attachmentFileName}</p>

                                   <p> <AttachmentDownloadButton taskId={_id} attachmentId={attachment.attachmentId
                                    } attachmentFileName={attachment.attachmentFileName}></AttachmentDownloadButton></p>
                                </li>
                            ))}
                        </ul>

                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default TaskCard;