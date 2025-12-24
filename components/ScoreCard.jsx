import React from 'react'


export default function ScoreCard({score}){
return (
<div className="bg-white rounded-2xl p-6 shadow-lg w-64">
<h3 className="text-gray-500">ATS Score</h3>
<div className="text-5xl font-bold text-indigo-600 mt-4">{score}%</div>
</div>
)
}