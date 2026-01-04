
import React, { useEffect } from 'react';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { Samples } from './components/Samples';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { ContentProvider, useContent } from './contexts/ContentContext';

const PixelInjector = () => {
    const { content } = useContent();
    
    useEffect(() => {
        if (content.settings.pixelCode) {
            const containerId = 'dynamic-pixel-container';
            let container = document.getElementById(containerId);
            
            if (container) {
                container.innerHTML = '';
            } else {
                container = document.createElement('div');
                container.id = containerId;
                container.style.display = 'none';
                document.body.appendChild(container);
            }
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(content.settings.pixelCode, 'text/html');
            const scripts = doc.getElementsByTagName('script');
            
            for (let i = 0; i < scripts.length; i++) {
                const oldScript = scripts[i];
                const newScript = document.createElement('script');
                
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                if (oldScript.innerHTML) {
                    newScript.innerHTML = oldScript.innerHTML;
                }
                
                container.appendChild(newScript);
            }
            
            const noscripts = doc.getElementsByTagName('noscript');
            for (let i = 0; i < noscripts.length; i++) {
                const ns = document.createElement('noscript');
                ns.innerHTML = noscripts[i].innerHTML;
                container.appendChild(ns);
            }
        }
    }, [content.settings.pixelCode]);

    return null;
};

function AppContent() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-500 selection:text-white">
      <PixelInjector />
      <Hero />
      <Samples />
      <Features />
      <Testimonials />
      <Specialties />
      <Pricing />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
