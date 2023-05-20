import React from "react";

const Search = ({
  location,
  setLocation,
  setLocationNotFound,
}: {
  location: string | undefined;
  setLocation: (value: React.SetStateAction<string | undefined>) => void;
  setLocationNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setLocationNotFound(false);
  };
  return (
    <div className="flex-1">
      <input
        className="outline-none input w-full"
        placeholder="Enter city..."
        type="text"
        value={location}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Search;
