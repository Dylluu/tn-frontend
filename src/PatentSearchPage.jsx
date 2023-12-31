import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import './styles/App.css';
import PageSelector from './components/PageSelector';

const PatentSearchPage = () => {

    // useState to hold inputted keyword(s)
    const [keyword, setKeyword] = useState('');

    // useState to hold results returned from keyword
    const [results, setResults] = useState({total_count: 0, query_results: []});

    // useState to hold current page number
    const [pageNum, setPageNum] = useState(1);

    // useState to hold loading status
    const [loading, setLoading] = useState(false);

    // function to handle backend fetch based on inputted keyword(s) and pagination
    const handleSearch = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_URL}/api/?query=${keyword}&page=${page}`;
            const response = await fetch(url);
            if (!response) {
                throw new Error('No response');
            }
            const jsonData = await response.json();
            setResults(jsonData);

            if (page === 1) {
                setPageNum(1);
            }
        } catch (error) {
            console.error('An error occurred in handleSearch:', error);
        }
        setLoading(false);
    }, [setResults, keyword]);

    return (
        <div>
            <div className='search_container'>
                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    handleSearch={handleSearch}
                />
                {results.total_count > 0 && !loading && (
                    <span className='res_message'>
                        Found {results.total_count} results
                    </span>
                )}
                {loading && (
                    <span className='res_message'>
                        Loading...
                    </span>
                )}
            </div>
            <div className='results_table_container'>
                <DataTable
                    results={results.query_results}
                />
            </div>
            {results.total_count > 10 && (
                <PageSelector
                    totalResults={results.total_count}
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    handleSearch={handleSearch}
                />
            )}
        </div>
    );
};

export default PatentSearchPage;
