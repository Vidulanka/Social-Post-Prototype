import React, { useState } from 'react'

export default function Login(){
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function validate(){
    const e = {}
    if(!user.trim()) e.user = 'Email or username is required'
    else if(user.trim().length < 3) e.user = 'At least 3 characters required'
    if(!password) e.password = 'Password is required'
    else if(password.length < 6) e.password = 'Password must be 6+ chars'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(ev){
    ev.preventDefault()
    setMessage('')
    if(!validate()) return
    setLoading(true)
    setTimeout(()=>{
      sessionStorage.setItem('sp_token','react-fake-token')
      setMessage('Signed in successfully (simulated)')
      setLoading(false)
    },900)
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">SP</div>
        <div>
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-slate-500">Sign in to continue to Social Post</p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <label className="block text-sm text-slate-600">Email or username</label>
        <input className={`mt-1 w-full rounded-lg border px-3 py-2 ${errors.user ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
          value={user} onChange={e=>setUser(e.target.value)} />
        {errors.user && <p className="text-xs text-red-600 mt-1">{errors.user}</p>}

        <label className="block text-sm text-slate-600 mt-4">Password</label>
        <div className="mt-1 relative">
          <input type={show ? 'text' : 'password'} className={`w-full rounded-lg border px-3 py-2 ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}
            value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600">{show ? 'Hide' : 'Show'}</button>
        </div>
        {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="accent-indigo-500" /> Remember me</label>
          <a className="text-sm text-indigo-600" href="#">Forgot?</a>
        </div>

        <button className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:opacity-95" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        {message && <div className="mt-4 text-sm text-green-600">{message}</div>}
      </form>
    </div>
  )
}
