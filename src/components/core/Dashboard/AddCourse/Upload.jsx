// import { useEffect, useRef, useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { FiUploadCloud } from "react-icons/fi"
// import { useSelector } from "react-redux"

// import "video-react/dist/video-react.css"
// import { Player } from "video-react"

// export default function Upload({
//   name,
//   label,
//   register,
//   setValue,
//   errors,
//   video = false,
//   viewData = null,
//   editData = null,
// }) {
//   const { course } = useSelector((state) => state.course)
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [previewSource, setPreviewSource] = useState(
//     viewData ? viewData : editData ? editData : ""
//   )
//   const inputRef = useRef(null)

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0]
//     if (file) {
//       previewFile(file)
//       setSelectedFile(file)
//     }
//   }

//   // const { getRootProps, getInputProps, isDragActive } = useDropzone({
//   //   accept: !video
//   //     ? { "image/*": [".jpeg", ".jpg", ".png"] }
//   //     : { "video/*": [".mp4"] },
//   //   onDrop,
//   // })

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: !video
//       ? { "image/*": [".jpeg", ".jpg", ".png"] }
//       : { "video/*": [".mp4"] }, // Allow video files
//     onDrop,
//   });
  

//   const previewFile = (file) => {
//     // console.log(file)
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onloadend = () => {
//       setPreviewSource(reader.result)
//     }
//   }

//   useEffect(() => {
//     register(name, { required: true })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [register])

//   useEffect(() => {
//     setValue(name, selectedFile)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedFile, setValue])

//   return (
//     <div className="flex flex-col space-y-2">
//       <label className="text-sm text-richblack-5" htmlFor={name}>
//         {label} {!viewData && <sup className="text-pink-200">*</sup>}
//       </label>
    
// {/* 
// <div
//   className={`${
//     isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//   } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//   onClick={() => inputRef.current?.click()} // Programmatically trigger the file input click
//   {...getRootProps({ onClick: false })} // Prevent react-dropzone from overriding the click
// >
//   {previewSource ? (
//     <div className="flex w-full flex-col p-6">
//       {!video ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         <Player aspectRatio="16:9" playsInline src={previewSource} />
//       )}
//       {!viewData && (
//         <button
//           type="button"
//           onClick={() => {
//             setPreviewSource("")
//             setSelectedFile(null)
//             setValue(name, null)
//           }}
//           className="mt-3 text-richblack-400 underline"
//         >
//           Cancel
//         </button>
//       )}
//     </div>
//   ) : (
//     <div className="flex w-full flex-col items-center p-6">
//       <input {...getInputProps()} ref={inputRef} />
//       <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//         <FiUploadCloud className="text-2xl text-yellow-50" />
//       </div>
//       <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//         Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//         <span className="font-semibold text-yellow-50">Browse</span> a file
//       </p>
//       <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//         <li>Aspect ratio 16:9</li>
//         <li>Recommended size 1024x576</li>
//       </ul>
//     </div>
//   )}
// </div> */}


// {/* 
// <div
//   className={`${
//     isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//   } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//   onClick={() => inputRef.current?.click()} // Programmatically trigger the file input click
//   {...getRootProps({ onClick: false })} // Prevent react-dropzone from overriding the click
// >
//   <input {...getInputProps()} ref={inputRef} />
//   <div className="flex w-full flex-col items-center p-6">
//     <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//       <FiUploadCloud className="text-2xl text-yellow-50" />
//     </div>
//     <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//       Drag and drop an {!video ? "image" : "video"}, or click to{" "}
//       <span className="font-semibold text-yellow-50">Browse</span> a file
//     </p>
//     <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//       <li>Aspect ratio 16:9</li>
//       <li>Recommended size 1024x576</li>
//     </ul>
//   </div>
// </div> */}








// <div
//   className={`${
//     isDragActive ? "bg-richblack-600" : "bg-richblack-700"
//   } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
//   {...getRootProps({ onClick: false })}
//   onClick={(e) => {
//     if (!e.target.closest(".cancel-button")) {
//       inputRef.current?.click();
//     }
//   }}
// >
//   <input
//     {...getInputProps()}
//     ref={inputRef}
//     onClick={(e) => {
//       // Reset the input value to allow re-selecting the same file
//       e.target.value = null;
//     }}
//   />
//   {previewSource ? (
//     <div className="flex w-full flex-col p-6">
//       {!video ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />
//       ) : (
//         // Check if the file is a video and preview it
//         previewSource && previewSource.endsWith('.mp4') ? (
//           <video controls className="h-full w-full rounded-md object-cover">
//             <source src={previewSource} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         ) : (
//           <Player aspectRatio="16:9" playsInline src={previewSource} />
//         )
//       )}
//       <button
//         type="button"
//         className="mt-3 text-richblack-400 underline cancel-button"
//         onClick={(e) => {
//           e.stopPropagation(); // Prevent parent container click
//           setPreviewSource("");
//           setSelectedFile(null);
//           setValue(name, null);
//         }}
//       >
//         Cancel
//       </button>
//     </div>
//   ) : (
//     <div className="flex w-full flex-col items-center p-6">
//       <FiUploadCloud className="text-2xl text-yellow-50" />
//       <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//         Drag and drop a {!video ? "image" : "video"}, or click to{" "}
//         <span className="font-semibold text-yellow-50">Browse</span> a file
//       </p>
//       <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//         <li>Aspect ratio 16:9</li>
//         <li>Recommended size 1024x576</li>
//       </ul>
//     </div>
//   )}
// </div>


//       {errors[name] && (
//         <span className="ml-2 text-xs tracking-wide text-pink-200">
//           {label} is required
//         </span>
//       )}
//     </div>
//   )
// }





import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    console.log('Accepted files:', acceptedFiles);  // Log the accepted files array for debugging
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
    console.log('Selected file:', file);  // Log the selected file after processing
  };

  // File preview function
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Set up dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? "video/*" : "image/*",  // Accept video files if `video` prop is true
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      {/* Dropzone */}
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps({ onClick: false })}  // Prevent react-dropzone from overriding the click
        onClick={(e) => {
          if (!e.target.closest(".cancel-button")) {
            inputRef.current?.click();  // Programmatically trigger the file input click
          }
        }}
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          onClick={(e) => {
            e.target.value = null;  // Reset the input value to allow re-selecting the same file
          }}
        />
        
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              // Check if the file is a video and preview it
              <video controls className="h-full w-full rounded-md object-cover">
                <source src={previewSource} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <button
              type="button"
              className="mt-3 text-richblack-400 underline cancel-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent container click
                setPreviewSource("");
                setSelectedFile(null);
                setValue(name, null);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <FiUploadCloud className="text-2xl text-yellow-50" />
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}