import React, { useState, useEffect } from 'react';
import { Send, Github, Twitter, Instagram, Mail } from 'lucide-react';
import { NeonButton } from '../components/NeonButton';

// Types pour EmailJS
declare global {
  interface Window {
    emailjs: any;
  }
}

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
    aria-label={label}
  >
    <div className="p-2 rounded-lg bg-gray-900/50 backdrop-blur-sm group-hover:bg-gray-800/50 transition-colors duration-300 cyber-border">
      {icon}
    </div>
    <span className="text-sm tracking-wider">{label}</span>
  </a>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Initialiser EmailJS
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init("8nzMGxV-TWBMYNcMM");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await window.emailjs.send(
        "service_i12vczr",
        "template_csup3ji",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-20">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'gridMove 20s linear infinite'
        }}
      />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-cyberpunk text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 mb-4 cyber-glow">
              Connect With Us
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to bring your digital vision to life? Reach out through any channel below 
              or fill out the form. We're here to transform your ideas into reality.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 blur-xl" />
              <div className="relative bg-gray-900/70 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors duration-500">
                <h3 className="text-2xl text-cyan-400 font-cyberpunk mb-8 cyber-glow">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6" id="contactForm">
                  <div>
                    <label htmlFor="name" className="block text-sm text-cyan-300 mb-2 font-light tracking-wider">
                      NAME
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-cyan-900/30 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 placeholder-gray-500"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-cyan-300 mb-2 font-light tracking-wider">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900/50 border border-cyan-900/30 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 placeholder-gray-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-cyan-300 mb-2 font-light tracking-wider">
                      MESSAGE
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-gray-900/50 border border-cyan-900/30 rounded-lg px-4 py-3 text-cyan-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 placeholder-gray-500"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="text-red-400 text-sm">{errorMessage}</div>
                  )}
                  
                  {status === 'success' && (
                    <div className="text-green-400 text-sm">Message sent successfully!</div>
                  )}

                  <NeonButton 
                    type="submit" 
                    className="w-full group" 
                    disabled={status === 'loading'}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className={`w-4 h-4 ${status !== 'loading' ? 'group-hover:translate-x-1' : ''} transition-transform duration-300`} />
                      {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                    </span>
                  </NeonButton>
                </form>
              </div>
            </div>

            {/* Social Links & Info */}
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 blur-xl" />
                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors duration-500">
                  <h3 className="text-2xl text-cyan-400 font-cyberpunk mb-8 cyber-glow">Connect With Us</h3>
                  <div className="space-y-6">
                    <SocialLink
                      href="https://github.com/pixelnoir"
                      icon={<Github className="w-5 h-5" />}
                      label="@pixelnoir"
                    />
                    <SocialLink
                      href="https://twitter.com/pixelnoir_studio"
                      icon={<Twitter className="w-5 h-5" />}
                      label="@pixelnoir_studio"
                    />
                    <SocialLink
                      href="https://instagram.com/pixelnoir.studio"
                      icon={<Instagram className="w-5 h-5" />}
                      label="@pixelnoir.studio"
                    />
                    <SocialLink
                      href="mailto:contact@pixelnoir.studio"
                      icon={<Mail className="w-5 h-5" />}
                      label="contact@pixelnoir.studio"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-magenta-500/10 blur-xl" />
                <div className="relative bg-gray-900/70 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors duration-500">
                  <h3 className="text-2xl text-cyan-400 font-cyberpunk mb-4 cyber-glow">Studio Location</h3>
                  <div className="space-y-2 text-gray-300">
                    <p className="font-light">Neo Tokyo District</p>
                    <p className="font-light">Cyber Tower, Level 42</p>
                    <p className="font-light">Digital Quarter, CT-2077</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};