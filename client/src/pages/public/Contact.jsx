import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import PageTransition from '../../components/PageTransition.jsx';
import { Reveal } from '../../components/Motion.jsx';
import api from '../../api/axios.js';

const info = [
  { Icon: FiPhone, label: 'Phone', value: '6203454984' },
  { Icon: FiMail, label: 'Email', value: 'nam.anjalikumari@gmail.com' },
  { Icon: FiMapPin, label: 'Address', value: 'Kiul Basti, Pachna Road, Lakhisarai, Bihar' },
  { Icon: FiClock, label: 'Timing', value: 'Open 24x7' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in your name, email and message.');
      return;
    }
    setStatus('sending');
    try {
      await api.post('/contact', form);
      setStatus('Message sent! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('Could not send right now. Please call us instead.');
    }
  };

  return (
    <PageTransition>
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2">
        <Reveal>
          <h1 className="section-title">Contact Us</h1>
          <p className="mt-2 text-slate-500">We're here to help! Reach out to us for any queries or visits.</p>
          <div className="mt-8 space-y-5">
            {info.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <span className="feature-icon"><Icon /></span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-sm text-slate-500">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-6 sm:p-8">
            <h2 className="font-bold text-slate-900">Send Us a Message</h2>
            <div className="mt-5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="input" placeholder="Your Name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input className="input" placeholder="Your Email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <input className="input" placeholder="Phone Number" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea className="input min-h-[120px]" placeholder="Your Message" value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button onClick={submit} className="btn-primary w-full" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              {status && status !== 'sending' && (
                <p className="text-center text-sm text-slate-500">{status}</p>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
};

export default Contact;
