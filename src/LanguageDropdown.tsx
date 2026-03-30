import React from 'react';
import { IconFlag } from '@tabler/icons-react';

export type Language = {
  name: string;
  code: string;
  countryCode: string;
};

const languages: Language[] = [
  { name: 'български (България)', code: 'bg-BG', countryCode: 'BG' },
  { name: 'català (Espanya)', code: 'ca-ES', countryCode: 'ES' },
  { name: 'čeština (Česko)', code: 'cs-CZ', countryCode: 'CZ' },
  { name: 'dansk (Danmark)', code: 'da-DK', countryCode: 'DK' },
  { name: 'Deutsch (Deutschland)', code: 'de-DE', countryCode: 'DE' },
  { name: 'Ελληνικά (Ελλάδα)', code: 'el-GR', countryCode: 'GR' },
  { name: 'English (United Kingdom)', code: 'en-GB', countryCode: 'GB' },
  { name: 'English (United States)', code: 'en-US', countryCode: 'US' },
  { name: 'Bahasa Indonesia (Indonesia)', code: 'id-ID', countryCode: 'ID' },
  { name: 'español (Latinoamérica)', code: 'es-419', countryCode: 'MX' },
  { name: 'español (España)', code: 'es-ES', countryCode: 'ES' },
  { name: 'suomi (Suomi)', code: 'fi-FI', countryCode: 'FI' },
  { name: 'français (Canada)', code: 'fr-CA', countryCode: 'CA' },
  { name: 'français (France)', code: 'fr-FR', countryCode: 'FR' },
  { name: 'हिन्दी (भारत)', code: 'hi-IN', countryCode: 'IN' },
  { name: 'Tiếng Việt (Việt Nam)', code: 'vi-VN', countryCode: 'VN' },
  { name: '中文（中国）', code: 'zh-CN', countryCode: 'CN' },
  { name: '中文（香港）', code: 'zh-HK', countryCode: 'HK' },
];

// Map country codes to emoji flags using regional indicator symbols
const getCountryFlag = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

type LanguageDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: Language;
  onSelectLanguage: (language: Language) => void;
  buttonRef: React.RefObject<HTMLDivElement>;
};

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
  buttonRef,
}) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  // Position the dropdown
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 310;
      const dropdownHeight = 800; // Approximate max height

      // Calculate initial position
      let top = rect.bottom + 4;
      let left = rect.left;

      // Check if dropdown would overflow right edge of viewport
      if (left + dropdownWidth > window.innerWidth) {
        left = window.innerWidth - dropdownWidth - 8; // 8px margin from edge
      }

      // Check if dropdown would overflow bottom of viewport
      if (top + dropdownHeight > window.innerHeight) {
        // Position above the button instead
        top = rect.top - dropdownHeight - 4;

        // If still not enough space, position at top with some margin
        if (top < 0) {
          top = 8;
        }
      }

      setPosition({
        top,
        left,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  const isEnglishUS = selectedLanguage.code === 'en-US';

  return (
    <div
      ref={dropdownRef}
      className="fixed z-50 bg-white rounded-lg shadow-[0px_0px_11.3px_0px_rgba(0,0,0,0.25)] w-[310px] max-h-[800px] flex flex-col"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Feedback Button */}
      <div className="px-3 py-2 border-b border-[#dee5eb] flex-shrink-0">
        <button
          disabled={isEnglishUS}
          className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold transition-colors ${
            isEnglishUS
              ? 'bg-[#f8f9fa] text-[#a1b0b7] cursor-not-allowed'
              : 'bg-[#205ae3] text-white hover:bg-[#1a4bc7] cursor-pointer'
          }`}
        >
          <IconFlag size={11} stroke={1.5} />
          <span>Leave feedbacks on language</span>
        </button>
      </div>

      {/* Scrollable Menu Items */}
      <div className="overflow-y-auto flex-1">
        {languages.map((language) => {
          const isSelected = language.code === selectedLanguage.code;
          return (
            <button
              key={language.code}
              onClick={() => {
                onSelectLanguage(language);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 transition-colors ${
                isSelected ? 'bg-[#f1f5fe]' : 'bg-white hover:bg-[#f1f5fe]'
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg flex-shrink-0">{getCountryFlag(language.countryCode)}</span>
                <span className="text-sm text-[#25252a] truncate">{language.name}</span>
              </div>
              <div className="bg-[#ebf0f5] px-2 py-0.5 rounded-md flex-shrink-0 ml-2">
                <span className="text-xs font-mono text-[#25252a]">{language.code}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const useLanguageDropdown = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language>(
    languages.find(lang => lang.code === 'en-US')!
  );
  const buttonRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return {
    isOpen,
    selectedLanguage,
    buttonRef,
    toggleDropdown,
    closeDropdown,
    setSelectedLanguage,
  };
};
