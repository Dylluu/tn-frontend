import '../styles/App.css';

const SearchBar = (props) => {

    const { keyword, setKeyword, handleSearch } = props;

    return (
        <div className='search_bar_container'>
            <button
                onClick={() => setKeyword('')}
                disabled={keyword === ''}
            >
                X
            </button>
            <input
                type='text'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search by keyword(s)'
                className='search_bar_input'
            />
            <button
                onClick={handleSearch}
                disabled={keyword === ''}
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
