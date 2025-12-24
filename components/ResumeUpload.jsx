import React from 'react'


export default function ResumeUpload({onFileChange}){
return (
<div className="border-dashed border-2 border-gray-300 rounded-xl p-6 text-center">
<input type="file" accept=".pdf,.docx" onChange={(e)=>onFileChange(e.target.files[0])} />
<p className="mt-2 text-sm text-gray-500">Upload PDF or DOCX resume</p>
</div>
)
}