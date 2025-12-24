import React from 'react'


export default function SkillChips({items, type='matched'}){
const base = type === 'matched' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
return (
<div className="flex flex-wrap gap-2">
{items.map((s,i)=> (
<span key={i} className={`${base} px-3 py-1 rounded-full text-sm`}>{s}</span>
))}
</div>
)
}