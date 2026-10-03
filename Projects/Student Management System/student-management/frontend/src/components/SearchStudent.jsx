function SearchStudent({ searchQuery, setSearchQuery }) {
  return (
    <div className="search-box">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        placeholder="Search by Student ID or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchStudent;
