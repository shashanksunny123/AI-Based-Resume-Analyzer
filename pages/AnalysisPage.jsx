import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContent'

export default function AnalysisPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [resumeFile, setResumeFile] = useState(null)
  const [jdText, setJdText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
      setMessage('')
    } else {
      setMessage('Please select a valid PDF file for the resume')
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jdText.trim()) {
      setMessage('Please upload your resume (PDF) and paste the job description')
      return
    }
    setLoading(true)
    setMessage('Analysis in progress...')

    try {
      const formData = new FormData()
      formData.append('file', resumeFile)
      formData.append('jd_text', jdText)

      const res = await fetch(import.meta.env.VITE_API_URL + '/resume/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Analysis failed')
      }

      const data = await res.json()

      const result = {
        score: data.analysis.score,
        matched: data.analysis.matched_skills,
        missing: data.analysis.missing_skills,
        suggestions: data.suggestions || [],
        resume_text: data.resume_text,
        jd_text: data.jd_text,
      }

      // Save result so Analysis page can display it
      try {
        localStorage.setItem('analysisResult', JSON.stringify(result))
      } catch (e) {
        console.warn('Could not save analysis result locally', e)
      }

      setMessage('Analysis complete! Redirecting to results...')
      setLoading(false)
      navigate('/analysis')
    } catch (e) {
      console.error('Analyze error:', e)
      setMessage(e.message || 'Analysis failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Resume Analyzer</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8">Upload & Analyze</h2>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('error') || message.includes('Please')
                ? 'bg-red-500 bg-opacity-20 border border-red-400 text-red-200'
                : 'bg-blue-500 bg-opacity-20 border border-blue-400 text-blue-200'
            }`}>
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <div className="space-y-4">
              <label className="text-white font-semibold text-lg">Resume (PDF)</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resumeInput"
                />
                <label htmlFor="resumeInput" className="cursor-pointer">
                  <div className="text-blue-300 text-4xl mb-2">📄</div>
                  <p className="text-gray-300">
                    {resumeFile ? resumeFile.name : 'Click to upload your resume'}
                  </p>
                </label>
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-4 md:col-span-1">
              <label className="text-white font-semibold text-lg">Job Description (paste text)</label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description text here (or type it)."
                className="w-full min-h-[160px] p-4 rounded-lg bg-slate-700 bg-opacity-40 text-white placeholder-red-400 border border-slate-600 focus:border-orange-500 focus:ring-2 focus:ring-red-500 outline-none transition"
              />
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !resumeFile || !jdText.trim()}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800 bg-opacity-30 backdrop-blur rounded-xl border border-slate-700 p-6">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-2">Fast Analysis</h3>
            <p className="text-gray-300 text-sm">Get instant insights in seconds</p>
          </div>

          <div className="bg-slate-800 bg-opacity-30 backdrop-blur rounded-xl border border-slate-700 p-6">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-white font-semibold mb-2">Accurate Matching</h3>
            <p className="text-gray-300 text-sm">AI-powered skill matching</p>
          </div>

          <div className="bg-slate-800 bg-opacity-30 backdrop-blur rounded-xl border border-slate-700 p-6">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-white font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-300 text-sm">Get personalized recommendations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
