import { useState } from 'react'

export default function SearchMinPrice() {
  const [searchMin, setSearchMin] = useState("");
  const [searchMax, setSearchMax] = useState("");
  const [error, setError] = useState(false);

  const handleSearchMin = (e) => {
    const { value } = e.target;
    setSearchMin(value);
  };
  const handleSearchMax = (e) => {
    const { value } = e.target;
    setSearchMax(value);
  };

  const handleSearch = () => {
    if (!searchMin && !searchMax) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const params = {};

      if (searchMin) {
        params.min_price = searchMin;
      }

      if (searchMax) {
        params.max_price = searchMax;
      }

      const searchParams = new URLSearchParams(params);
      const newUrl = `${searchParams.toString()}`;

      window.history.pushState(null, "", `?${newUrl}`);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <span className="text-red-500 items-center mr-2">{error && 'Price Empty!'}</span>
      <div className="w-44 mr-2">
        <input
          type="number"
          value={searchMin}
          onChange={handleSearchMin}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder='Min Price...'
          required
        />
      </div>
      <div className="w-44 mr-2">
        <input
          type="number"
          value={searchMax}
          onChange={handleSearchMax}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder='Max Price...'
          required
        />
      </div>
      <div>
        <button onClick={handleSearch} className="btn btn-sm" style={{ backgroundColor: "#3797DB", color: "#ffff" }}>
          Search
        </button>
      </div>
    </div>
  )
}