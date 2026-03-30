import React, { useState, useRef, useEffect } from 'react';
import { IconCommand, IconSearch, IconX, IconSparkles, IconFileText, IconArrowUpRight } from '@tabler/icons-react';

interface SearchBarProps {
  recentSearches?: string[];
  onSearch?: (query: string) => void;
  onAskAI?: (question: string) => void;
}

export function ExpandableSearchBar({
  onSearch,
  onAskAI
}: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setSearchQuery('group calibrati');
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setShowDropdown(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsExpanded(true);
        setShowDropdown(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
      setSearchQuery('');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleAskAIQuestion = (question: string) => {
    setIsExpanded(false);
    setShowDropdown(false);
    setSearchQuery('');
    onAskAI?.(question);
  };

  return (
    <div ref={containerRef} className="relative flex justify-center">
      {/* Morphing Search Bar/Dropdown */}
      <div
        className={`
          bg-white
          flex flex-col
          overflow-hidden
          transition-all duration-150 ease-in-out
          absolute z-50
          -translate-y-[18px]
          ${isExpanded && showDropdown
            ? 'w-[583px] rounded-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]'
            : 'w-[220px] rounded-full bg-[#f8f9fa] border border-[#dee5eb]'
          }
        `}
      >
        {/* Search Input Header */}
        <div
          onClick={!isExpanded ? handleClick : undefined}
          className={`
            flex gap-2 items-center w-full overflow-hidden
            transition-all duration-150 ease-in-out
            ${isExpanded && showDropdown
              ? 'bg-white border-b border-[#dee5eb] px-3 py-2'
              : 'bg-transparent h-[34px] pl-3 pr-4 cursor-text'
            }
          `}
        >
          <IconSearch size={16} stroke={1.5} className="text-[#5d666f] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search or Ask AI"
            className="
              flex-1 bg-transparent outline-none border-none
              text-sm leading-[1.55]
              text-[#25252a]
              placeholder:text-[#a1b0b7] placeholder:text-sm
              min-w-0
            "
          />
          {isExpanded && searchQuery ? (
            <button onClick={handleClear} className="flex items-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity">
              <IconX size={16} stroke={1.5} className="text-[#5d666f]" />
            </button>
          ) : !isExpanded ? (
            <div className="flex items-center gap-0.5 shrink-0 text-[#a1b0b7]">
              <IconCommand size={18} stroke={1.5} />
              <span className="text-xs font-medium">K</span>
            </div>
          ) : null}
        </div>

        {/* Suggested Content - Only shown when expanded */}
        {isExpanded && showDropdown && (
          <div className="bg-white flex flex-col gap-3 p-3 w-full animate-slideDown max-h-[500px] overflow-y-auto">
            {/* Filters */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setActiveFilter('All')}
                className={`
                  flex gap-1 h-[22px] items-center px-2 rounded-lg cursor-pointer transition-all
                  ${activeFilter === 'All' ? 'bg-[#ebf0f5]' : ''}
                `}
              >
                <p className={`text-[10px] font-semibold leading-[1.55] whitespace-nowrap ${activeFilter === 'All' ? 'text-[#5d666f]' : 'text-[#a1b0b7]'}`}>
                  All
                </p>
              </button>
              <button
                onClick={() => setActiveFilter('Ask AI')}
                className={`
                  flex gap-1 h-[22px] items-center px-2 rounded-lg cursor-pointer transition-all
                  ${activeFilter === 'Ask AI' ? 'bg-[#ebf0f5]' : ''}
                `}
              >
                <p className={`text-[10px] font-semibold leading-[1.55] whitespace-nowrap ${activeFilter === 'Ask AI' ? 'text-[#5d666f]' : 'text-[#a1b0b7]'}`}>
                  Ask AI
                </p>
              </button>
              <button
                onClick={() => setActiveFilter('Documentation')}
                className={`
                  flex gap-1 h-[22px] items-center px-2 rounded-lg cursor-pointer transition-all
                  ${activeFilter === 'Documentation' ? 'bg-[#ebf0f5]' : ''}
                `}
              >
                <p className={`text-[10px] font-semibold leading-[1.55] whitespace-nowrap ${activeFilter === 'Documentation' ? 'text-[#5d666f]' : 'text-[#a1b0b7]'}`}>
                  Documentation
                </p>
              </button>
              <button
                onClick={() => setActiveFilter('Navigation')}
                className={`
                  flex gap-1 h-[22px] items-center px-2 rounded-lg cursor-pointer transition-all
                  ${activeFilter === 'Navigation' ? 'bg-[#ebf0f5]' : ''}
                `}
              >
                <p className={`text-[10px] font-semibold leading-[1.55] whitespace-nowrap ${activeFilter === 'Navigation' ? 'text-[#5d666f]' : 'text-[#a1b0b7]'}`}>
                  Navigation
                </p>
              </button>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-3">
              {/* AI Suggestions */}
              {(activeFilter === 'All' || activeFilter === 'Ask AI') && (
                <>
                  <button
                    onClick={() => handleAskAIQuestion('What is group calibration?')}
                    className="flex gap-2 items-start cursor-pointer hover:bg-[#f8f9fa] transition-colors rounded p-2 -m-2"
                  >
                    <IconSparkles size={16} stroke={1.5} className="text-[#5d666f] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 items-start">
                      <p className="text-xs font-medium leading-[1.55] text-[#5d666f] text-left">
                        What is group calibration?
                      </p>
                      <p className="text-[10px] font-medium leading-[1.55] text-[#a1b0b7]">
                        Ask AI
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAskAIQuestion("How does group calibration speed up my reviewers' workflows?")}
                    className="flex gap-2 items-start cursor-pointer hover:bg-[#f8f9fa] transition-colors rounded p-2 -m-2"
                  >
                    <IconSparkles size={16} stroke={1.5} className="text-[#5d666f] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 items-start">
                      <p className="text-xs font-medium leading-[1.55] text-[#5d666f] text-left">
                        How does group calibration speed up my reviewers' workflows?
                      </p>
                      <p className="text-[10px] font-medium leading-[1.55] text-[#a1b0b7]">
                        Ask AI
                      </p>
                    </div>
                  </button>
                </>
              )}

              {/* Divider - only show when there are items above and below */}
              {activeFilter === 'All' && <div className="w-full h-px bg-[#dee5eb]" />}

              {/* Documentation Results */}
              {(activeFilter === 'All' || activeFilter === 'Documentation') && (
                <>
                  <button className="flex gap-2 items-start cursor-pointer hover:bg-[#f8f9fa] transition-colors rounded p-2 -m-2">
                    <IconFileText size={16} stroke={1.5} className="text-[#5d666f] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 items-start">
                      <p className="text-xs font-medium leading-[1.55] text-[#5d666f] text-left">
                        <span className="underline decoration-[rgba(115,136,255,0.2)] decoration-2">Group Calibrati</span>on
                      </p>
                      <p className="text-[10px] font-medium leading-[1.55] text-[#a1b0b7]">
                        Documentation
                      </p>
                    </div>
                  </button>

                  <button className="flex gap-2 items-start cursor-pointer hover:bg-[#f8f9fa] transition-colors rounded p-2 -m-2">
                    <IconFileText size={16} stroke={1.5} className="text-[#5d666f] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 items-start">
                      <p className="text-xs font-medium leading-[1.55] text-[#5d666f] text-left">
                        Video: QM <span className="underline decoration-[rgba(115,136,255,0.2)] decoration-2">Calibrati</span>on Overview
                      </p>
                      <p className="text-[10px] font-medium leading-[1.55] text-[#a1b0b7]">
                        Documentation
                      </p>
                    </div>
                  </button>
                </>
              )}

              {/* Divider - only show when there are items above and below */}
              {activeFilter === 'All' && <div className="w-full h-px bg-[#dee5eb]" />}

              {/* Navigation Result */}
              {(activeFilter === 'All' || activeFilter === 'Navigation') && (
                <button className="flex gap-2 items-start cursor-pointer hover:bg-[#f8f9fa] transition-colors rounded p-2 -m-2">
                  <IconArrowUpRight size={16} stroke={1.5} className="text-[#5d666f] shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-0.5 items-start">
                    <p className="text-xs font-medium leading-[1.55] text-[#5d666f] text-left">
                      QM Task Home &gt; QM Calibration
                    </p>
                    <p className="text-[10px] font-medium leading-[1.55] text-[#a1b0b7]">
                      Navigation
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
