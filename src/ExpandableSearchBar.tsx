import React, { useState, useRef, useEffect } from 'react';
import { IconCommand, IconSearch } from '@tabler/icons-react';

interface SearchBarProps {
  recentSearches?: string[];
  onSearch?: (query: string) => void;
}

export function ExpandableSearchBar({
  recentSearches = [
    "How to configure agents",
    "Dashboard setup guide",
    "Performance metrics",
    "User management",
    "API documentation"
  ],
  onSearch
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsExpanded(true);
    setShowDropdown(true);
  };

  const handleSearch = (query: string) => {
    onSearch?.(query);
    setSearchQuery(query);
    setShowDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      setShowDropdown(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Bar */}
      <div
        onClick={handleClick}
        className={`
          bg-[#f8f9fa]
          border border-[#dee5eb]
          flex h-[34px] items-center justify-between
          pl-3 pr-4
          rounded-full
          shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]
          transition-all duration-200 ease-in-out
          cursor-text
          ${isExpanded ? 'w-[400px]' : 'w-[220px]'}
        `}
      >
        <div className="flex items-center flex-1">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search Cresta"
            className="
              w-full bg-transparent outline-none border-none
              text-sm leading-[21.7px]
              text-[#25252a]
              placeholder:text-[#a1b0b7]
            "
          />
        </div>
        <div className="flex items-center gap-0.5 shrink-0 text-[#a1b0b7]">
          <IconCommand size={18} stroke={1.5} />
          <span className="text-xs font-medium">K</span>
        </div>
      </div>

      {/* Recent Searches Dropdown */}
      {isExpanded && showDropdown && (
        <div className="
          absolute left-0 right-0 mt-2
          bg-white
          flex flex-col
          overflow-hidden
          rounded-lg
          shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.04),0px_20px_25px_-5px_rgba(0,0,0,0.05),0px_1px_3px_0px_rgba(0,0,0,0.05)]
          z-50
        ">
          {/* Header */}
          <div className="
            bg-white
            border-b border-[#dee5eb]
            flex gap-2
            items-center
            p-3
            w-full
          ">
            <IconSearch size={16} stroke={1.5} className="text-[#5d666f]" />
            <p className="text-xs font-medium leading-[1.55] text-[#5d666f]">
              Recent searches
            </p>
          </div>

          {/* Menu Items */}
          <div className="bg-white flex flex-col w-full">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSearch(search)}
                className="
                  flex gap-2
                  items-center
                  px-3 py-2
                  w-full
                  hover:bg-[#f8f9fa]
                  cursor-pointer
                  transition-colors
                  text-left
                "
              >
                <p className="text-sm leading-[1.55] text-[#25252a]">
                  {search}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
