import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContent'

export default function Analysis() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('analysisResult') || 'null')
      if (stored) setResult(stored)
    } catch (e) {
      console.warn('Failed to parse stored analysis result', e)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  // Render dynamic results if present, otherwise show guidance
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Header */}
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Resume Analysis</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Analysis Results</h2>

          {!result ? (
            <div className="text-gray-300">No analysis found. Please upload resume and job description on the Upload & Analyze page.</div>
          ) : (
            <>
              <p className="text-gray-300 mb-8">Here are the results from your last analysis.</p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-700 bg-opacity-50 rounded-xl p-6 border border-slate-600">
                  <div className="text-sm text-gray-400 mb-2">Match Score</div>
                  <div className="text-4xl font-bold text-blue-400">{result.score}%</div>
                  <div className="text-sm text-gray-400 mt-2">Skills matched</div>
                </div>

                <div className="bg-slate-700 bg-opacity-50 rounded-xl p-6 border border-slate-600">
                  <div className="text-sm text-gray-400 mb-2">Matched Skills</div>
                  <div className="text-4xl font-bold text-green-400">{result.matched?.length ?? 0}</div>
                  <div className="text-sm text-gray-400 mt-2">Your skills found</div>
                </div>

                <div className="bg-slate-700 bg-opacity-50 rounded-xl p-6 border border-slate-600">
                  <div className="text-sm text-gray-400 mb-2">Missing Skills</div>
                  <div className="text-4xl font-bold text-orange-400">{result.missing?.length ?? 0}</div>
                  <div className="text-sm text-gray-400 mt-2">To improve chances</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">✓ Matched Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {(result.matched || []).map((skill) => (
                    <span key={skill} className="bg-green-600 bg-opacity-30 text-green-300 px-4 py-2 rounded-full text-sm border border-green-500">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">⚠ Missing Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {(result.missing || []).map((skill) => (
                    <span key={skill} className="bg-orange-600 bg-opacity-30 text-orange-300 px-4 py-2 rounded-full text-sm border border-orange-500">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">💡 Suggestions</h3>
                <div className="space-y-4">
                  {(() => {
                    const s = result.suggestions
                    // If suggestions is a JSON string, try parsing
                    if (typeof s === 'string') {
                      try {
                        const parsed = JSON.parse(s)
                        if (parsed.summary) {
                          return (
                            <div className="bg-indigo-600 bg-opacity-20 border border-indigo-500 rounded-lg p-4">
                              <pre className="text-indigo-200 whitespace-pre-wrap">{JSON.stringify(parsed, null, 2)}</pre>
                            </div>
                          )
                        }
                        if (Array.isArray(parsed)) {
                          return parsed.map((p, idx) => (
                            <div key={idx} className="bg-indigo-600 bg-opacity-20 border border-indigo-500 rounded-lg p-4">
                              <p className="text-indigo-200">{typeof p === 'string' ? p : JSON.stringify(p)}</p>
                            </div>
                          ))
                        }
                      } catch (e) {
                        // not JSON - fallthrough
                      }
                      return (
                        <div className="bg-indigo-600 bg-opacity-20 border border-indigo-500 rounded-lg p-4">
                          <p className="text-indigo-200 whitespace-pre-wrap">{s}</p>
                        </div>
                      )
                    }

                    if (Array.isArray(s)) {
                      return s.map((p, idx) => (
                        <div key={idx} className="bg-indigo-600 bg-opacity-20 border border-indigo-500 rounded-lg p-4">
                          <p className="text-indigo-200">{p}</p>
                        </div>
                      ))
                    }

                    return null
                  })()}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/analysis-page')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Upload New Files
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}