import React, { useState } from 'react'
import ResumeUpload from '../components/ResumeUpload'
import { uploadResume } from '../api/resumeApi'
import { uploadJDText } from '../api/jdApi'
import { useNavigate } from 'react-router-dom'


export default function Home(){
const [file, setFile] = useState(null)
const [jd, setJd] = useState('')
const [loading, setLoading] = useState(false)
const nav = useNavigate()


const handleAnalyze = async ()=>{
if(!file || !jd){ alert('Please provide resume and JD'); return }
setLoading(true)
try{
const fd = new FormData(); fd.append('file', file)
const rRes = await uploadResume(fd)
const jRes = await uploadJDText({ jd_text: jd })


// store for analysis route
localStorage.setItem('resume', JSON.stringify(rRes.data))
localStorage.setItem('jd', JSON.stringify(jRes.data))


nav('/analysis')
}catch(e){
console.error(e)
alert('Error during analysis')
}finally{ setLoading(false) }
}


return (
<div className="min-h-screen p-10 bg-gray-50">
<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
<h2 className="text-2xl font-bold mb-4">Upload Resume & Job Description</h2>
<div className="grid grid-cols-2 gap-6">
<div>
<ResumeUpload onFileChange={setFile} />
{file && <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>}
</div>
<div>
<textarea placeholder="Paste Job Description here" className="w-full h-48 border rounded-lg p-4" onChange={(e)=>setJd(e.target.value)} />
</div>
</div>
<div className="mt-6 flex justify-end">
<button onClick={handleAnalyze} className="bg-indigo-600 text-white px-6 py-3 rounded-xl">Analyze</button>
</div>
</div>
</div>
)
}