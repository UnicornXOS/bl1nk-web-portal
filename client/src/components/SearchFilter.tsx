import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  filterOptions?: FilterOption[];
  placeholder?: string;
}

export default function SearchFilter({
  onSearch,
  onFilterChange,
  filterOptions,
  placeholder = 'Search content...',
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const defaultFilterOptions: FilterOption[] = [
    { id: 'github', label: 'GitHub', count: 12 },
    { id: 'gitbook', label: 'GitBook', count: 8 },
    { id: 'notion', label: 'Notion', count: 4 },
    { id: 'favorite', label: 'Favorites', count: 5 },
    { id: 'recent', label: 'Recent', count: 10 },
    { id: 'archived', label: 'Archived', count: 2 },
  ];

  const displayFilterOptions = filterOptions || defaultFilterOptions;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter((f) => f !== filterId)
      : [...selectedFilters, filterId];
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery('');
    onSearch?.('');
    onFilterChange?.([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSearch?.('');
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="border-cyan-500/30 hover:bg-cyan-500/10"
        >
          <Filter size={18} className="mr-2" />
          Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </Button>

        {selectedFilters.length > 0 && (
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="border-red-500/30 hover:bg-red-500/10 text-red-400"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <Card className="bg-slate-900/50 border-slate-800 p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {displayFilterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFilterToggle(option.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  selectedFilters.includes(option.id)
                    ? 'border-cyan-500 bg-cyan-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50'
                }`}
              >
                <p className="text-sm font-semibold text-white">{option.label}</p>
                {option.count !== undefined && (
                  <p className="text-xs text-gray-400 mt-1">{option.count} items</p>
                )}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filterId) => {
            const filterLabel = displayFilterOptions.find((f) => f.id === filterId)?.label;
            return (
              <Badge
                key={filterId}
                className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 border cursor-pointer hover:bg-cyan-500/30 transition-colors"
                onClick={() => handleFilterToggle(filterId)}
              >
                {filterLabel}
                <X size={14} className="ml-2" />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
