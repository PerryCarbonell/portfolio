import { useState } from 'react'

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  /*
   * ─── HOW TO WIRE UP EMAIL ─────────────────────────────────────────────────
   * Option A (recommended): Use Netlify Forms.
   *   - Add  data-netlify="true"  to the <form> element.
   *   - Netlify captures submissions automatically — no backend needed.
   *   - View replies in your Netlify dashboard.
   *
   * Option B: Use Formspree (formspree.io).
   *   - Replace the fetch URL below with your Formspree endpoint.
   * ─────────────────────────────────────────────────────────────────────────
   */
  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...form }).toString(),
      })
      if (res.ok) setSent(true)
      else setError('Something went wrong. Please try again.')
    } catch {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="contact-page">
      <h2>CONTACT</h2>

      {sent ? (
        <p className="contact-success">Message received — thank you.</p>
      ) : (
        /* data-netlify enables Netlify Forms; harmless if not on Netlify */
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          name="contact"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />

          <label>
            Name
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Send</button>

          {error && <p className="contact-success">{error}</p>}
        </form>
      )}
    </div>
  )
}
