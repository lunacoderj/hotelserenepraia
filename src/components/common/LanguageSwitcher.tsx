import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh-CN', name: 'Chinese' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    setSearchQuery('');
    
    // Google Translate DOM manipulation
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-sm bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-colors group"
      >
        <Globe className="w-4 h-4 text-pearl group-hover:text-gold transition-colors" />
        <span className="text-pearl font-body text-[10px] tracking-widest uppercase hidden md:inline-block">
          {languages.find(l => l.code === currentLang)?.name.substring(0, 3)}
        </span>
        <ChevronDown className="w-3 h-3 text-pearl/50" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-navy/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-sm overflow-hidden z-50">
          <div className="p-2 border-b border-white/10">
            <input 
              type="text" 
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 text-pearl text-xs placeholder:text-pearl/50 px-3 py-2 rounded border border-white/5 outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <div className="max-h-48 overflow-y-auto scrollbar-hide hide-scroll-bar">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-xs font-body tracking-wider flex items-center justify-between hover:bg-gold hover:text-navy transition-colors ${
                  currentLang === lang.code ? 'text-gold bg-white/5' : 'text-pearl/80'
                }`}
              >
                <span>{lang.name}</span>
                {currentLang === lang.code && <Check className="w-3 h-3" />}
              </button>
            ))}
            {filteredLanguages.length === 0 && (
              <div className="px-4 py-3 text-xs text-pearl/50 text-center font-body">No language found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
