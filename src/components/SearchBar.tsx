import React, { useState, useEffect, useCallback } from 'react';
import search from '../icons/search.svg';
import { fetchRepositories } from '../services/github';

interface ISearchBar {
  placeHolder?: string;
  onSelectedValuesChange: (values: string[]) => void;
}

const SearchBar = ({ placeHolder, onSelectedValuesChange }: ISearchBar) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState<any[]>([]);
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const fetchRepos = useCallback(async (value: string) => {
    if (value.trim() !== '') {
      const repositories = await fetchRepositories(value);
      setSearchOptions(repositories);
      setShowOptions(repositories.length > 0);
    } else {
      setShowOptions(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchRepos(searchValue);
    }
  };

  const handleOptionClick = (option: string) => {
    const updatedValues = [...selectedValues, option];
    setSelectedValues(updatedValues);
    onSelectedValuesChange(updatedValues); // Notify the parent component
    setSearchValue('');
    setShowOptions(false);
  };

  const handleRemoveOption = (index: number) => {
    const updatedValues = [...selectedValues];
    updatedValues.splice(index, 1);
    setSelectedValues(updatedValues);
    onSelectedValuesChange(updatedValues); // Notify the parent component
  };

  useEffect(() => {
    // Notify the parent component when selected values change
    onSelectedValuesChange(selectedValues);
  }, [selectedValues, onSelectedValuesChange]);

  return (
    <div className="relative">
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeHolder ?? 'Search...'}
        className="border border-gray-300 p-2 pr-8 rounded w-full"
      />
      {showOptions && (
        <ul className="absolute left-0 right-0 mt-1 border border-gray-300 bg-white rounded max-h-48 overflow-auto z-10">
          {searchOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {option.full_name}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap">
        {selectedValues.map((selectedOption, index) => (
          <div key={index} className="bg-gray-200 p-2 m-1 rounded">
            {selectedOption.full_name}
            <button
              onClick={() => handleRemoveOption(index)}
              className="ml-2 text-red-500 cursor-pointer"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
