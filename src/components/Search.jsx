import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSearch = () => {
    if (!search) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      const newPath = `?search=${search}`;

      window.history.pushState(null, "", newPath);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <span className="text-red-500 items-center mr-2">{error && 'Name Products Empty!'}</span>
      <div className="w-44 mr-2">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder='Name Products...'
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