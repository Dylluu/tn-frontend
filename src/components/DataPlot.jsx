import { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import '../styles/App.css';

const DataPlot = (props) => {

    const { plotData, xLabel, yLabel } = props;

    // dynamically set bar datakeys based on json provided by backend
    const dataKeys = useMemo(() => {
        if (plotData.length) {
            const keys = Object.keys(plotData[0]);
            return keys.slice(1);
        } else {
            return [];
        }
    }, [plotData]);

    if (!plotData.length) {
        return null;
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={300}
                data={plotData}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={Object.keys(plotData[0])[0]}
                    label={{
                        value: xLabel ?? '',
                        angle: 0,
                        position: 'bottom'
                    }}
                />
                <YAxis
                    label={{
                        value: yLabel ?? '',
                        angle: -90,
                        position: 'insideLeft'
                    }}
                />
                <Tooltip />
                {dataKeys.length > 0 && (
                    dataKeys.map((key, i) => (
                        <>
                            <Bar
                                key={`${key, i, 'bar'}`}
                                dataKey={key}
                                fill="#8884d8"
                                activeBar={<Rectangle
                                fill="pink"
                                stroke="blue" />}
                            />
                            <Line
                                key={`${key, i, 'line'}`}
                                type="monotone"
                                dataKey={key}
                                stroke="#ff7300"
                                activeDot={{ r: 8 }}
                            />
                        </>
                    ))
                )}
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default DataPlot;
