import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import './styles/App.css';

const PatentSearchPage = () => {

    // useState to hold inputted keyword(s)
    const [keyword, setKeyword] = useState('');

    // useState to hold results returned from keyword
    const [results, setResults] = useState({total_count: 0, query_results: []});

    // useState to hold current page number
    const [pageNum, setPageNum] = useState(1);

    // function to handle backend fetch based on inputted keyword(s)
    const handleSearch = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/?query=${keyword}&page=${pageNum}`);
            if (!response) {
                throw new Error('No response');
            }
            const jsonData = await response.json();
            setResults(jsonData);
        } catch (error) {
            console.error('An error occurred in handleSearch:', error);
        }
    }, [setResults, keyword, pageNum]);

    return (
        <div>
            <div className='search_container'>
                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    handleSearch={handleSearch}
                />
                {results.query_results.length > 0 && results.total_count > 0 && (
                    <span className='results_count'>
                        Found {results.total_count} results
                    </span>
                )}
            </div>
            <div className='results_table_container'>
                <DataTable
                    results={results.query_results}
                />
            </div>
        </div>
    );
};

export default PatentSearchPage;
