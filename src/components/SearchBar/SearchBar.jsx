const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements["search"].value;
    if (inputValue.trim() === "") {
      alert("Please enter what you are looking for!");
      return;
    }
    onSubmit(inputValue);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
