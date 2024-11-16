import React from 'react';
import { Github, Twitter, Instagram, Mail, Send } from 'lucide-react';
import { NeonButton } from './NeonButton';

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
    <div className="p-2 rounded-lg bg-gray-900 group-hover:bg-gray-800 transition-colors duration-300">
      {icon}
    </div>
    <span className="text-sm">{label}</span>
  </a>
);

export const ContactSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden border-t border-cyan-900/30">
      {/* Cyberpunk grid background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6,182,212,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6,182,212,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-cyberpunk text-cyan-400 mb-4">Connect With Us</h2>
            <p className="text-gray-400">
              Ready to bring your digital vision to life? Reach out through any channel below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h3 className="text-xl text-cyan-400 font-semibold mb-4">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    placeholder="Your message..."
                  />
                </div>
                <div>
                  <NeonButton className="w-full flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </NeonButton>
                </div>
              </form>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-xl text-cyan-400 font-semibold mb-4">Follow Us</h3>
              <div className="space-y-4">
                <SocialLink
                  href="https://github.com"
                  icon={<Github className="w-5 h-5" />}
                  label="@pixelnoir"
                />
                <SocialLink
                  href="https://twitter.com"
                  icon={<Twitter className="w-5 h-5" />}
                  label="@pixelnoir_studio"
                />
                <SocialLink
                  href="https://instagram.com"
                  icon={<Instagram className="w-5 h-5" />}
                  label="@pixelnoir.studio"
                />
                <SocialLink
                  href="mailto:contact@pixelnoir.studio"
                  icon={<Mail className="w-5 h-5" />}
                  label="contact@pixelnoir.studio"
                />
              </div>

              <div className="mt-8 p-6 bg-gray-900 rounded-lg border border-gray-800">
                <h4 className="text-cyan-400 font-semibold mb-2">Studio Location</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Neo Tokyo District<br />
                  Cyber Tower, Level 42<br />
                  Digital Quarter, CT-2077
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};