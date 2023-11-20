import { useMemo } from 'react';
import '../styles/App.css';

const DataTable = (props) => {

    const { results } = props;

    // set table headers
    const tableHeaders = useMemo(() => {
        if (results.length) {
            return Object.keys(results[0]);
        } else {
            return [];
        }
    }, [results]);

    if (!results.length || !tableHeaders.length) {
        return null;
    }

    return (
        <table>
            <thead>
                <tr>
                    {tableHeaders.map((col, i) => (
                        <th key={i}>{col}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {results.map((row, i) => (
                    <tr key={`${row.idx, i}`}>
                        {Object.keys(row).map((key) => (
                            <td key={`${row.idx, key}`}>{row[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default DataTable;
