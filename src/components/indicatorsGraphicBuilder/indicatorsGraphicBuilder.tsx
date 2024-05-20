import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchIndicatorByDate, fetchIndicatorByYear } from '../../requesters/indicatorsRequester';
import { IndicatorSeries } from '../../presenters/indicatorsPresenter';

interface GraphProps {
    indicatorCode: string;
    frequency: string;
    date: string;
}

const Graph: React.FC<GraphProps> = ({ indicatorCode, frequency, date }) => {
    const [data, setData] = useState<IndicatorSeries | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let result: IndicatorSeries;
                if (frequency === 'yearly') {
                    result = await fetchIndicatorByYear(indicatorCode, date);
                } else if (frequency === 'monthly') {
                    const year = date.split('-')[0];
                    const month = date.split('-')[1];
                    result = await fetchIndicatorByYear(indicatorCode, year);
                    result.serie = result.serie.filter(item => item.fecha.startsWith(`${year}-${month}`));
                } else {
                    result = await fetchIndicatorByDate(indicatorCode, date.split('-').reverse().join('-'));
                }

                if (result.serie.length === 0) {
                    setError('No data available for the selected indicator and period.');
                } else {
                    setData(result);
                }
            } catch (err) {
                setError('An error occurred while loading the data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [indicatorCode, frequency, date]);

    if (loading) {
        return <div className="spinner">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!data) {
        return null;
    }

    const xValues = data.serie.map((item: any) => (frequency === 'date' ? item.fecha.split('T')[1] : item.fecha));
    const yValues = data.serie.map((item: any) => item.valor);

    return (
        <Plot
            data={[
                {
                    x: xValues,
                    y: yValues,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'random' }, // use random color or assign unique colors
                    name: `${data.nombre} (${frequency})`,
                },
            ]}
            layout={{
                title: `${data.nombre} (${frequency})`,
                xaxis: { title: frequency === 'Date' ? 'Hours' : 'Date' },
                yaxis: { title: `Value (${data.unidad_medida})` },
            }}
        />
    );
};

export default Graph;