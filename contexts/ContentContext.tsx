
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ContentState } from '../types';
import { 
  HERO_CONTENT, 
  CLASSES_DATA, 
  SAMPLES_DATA, 
  FEATURES_DATA, 
  TESTIMONIALS_DATA,
  PRICING_CONTENT,
  FOOTER_CONTENT,
  DEFAULT_SETTINGS
} from '../constants';

const defaultState: ContentState = {
  hero: HERO_CONTENT,
  classes: CLASSES_DATA,
  samples: SAMPLES_DATA,
  features: FEATURES_DATA,
  testimonials: TESTIMONIALS_DATA,
  pricing: PRICING_CONTENT,
  footer: FOOTER_CONTENT,
  settings: DEFAULT_SETTINGS
};

// Utility to deep clone state and remove non-serializable elements for the admin panel
const safeClone = (data: any): any => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
};

interface ContentContextType {
  content: ContentState;
  updateContent: (newContent: ContentState) => void;
  safeClone: (data: any) => any;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restore setContent to allow the admin panel to update the live state
  const [content, setContent] = useState<ContentState>(() => {
    try {
        const saved = localStorage.getItem('app_content_premium');
        return saved ? JSON.parse(saved) : defaultState;
    } catch (e) {
        return defaultState;
    }
  });

  // Function to persist content changes in state and localStorage
  const updateContent = useCallback((newContent: ContentState) => {
    setContent(newContent);
    try {
      localStorage.setItem('app_content_premium', JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, safeClone }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
