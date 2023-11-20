import { useState, useCallback, useEffect } from 'react';
import './styles/App.css';
import DataPlot from './components/DataPlot';

const PhasePlotPage = () => {

    // useState to hold data from aggregate phase count query
    const [plotData, setPlotData] = useState([]);

    // queries table for aggregate phase count
    const fetchPhaseData = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/plot`);
            if (!response) {
                throw new Error('No response');
            }
            const jsonData = await response.json();
            setPlotData(jsonData);
        } catch (error) {
            console.error('An error occurred in fetchPhaseData:', error);
        }
    }, [setPlotData]);

    useEffect(() => {
        fetchPhaseData();
    }, []);

    return (
        <div className='phase_plot_container'>
            <DataPlot
                plotData={plotData}
                xLabel='Phase'
                yLabel='Count'
            />
        </div>
    )
};

export default PhasePlotPage;
