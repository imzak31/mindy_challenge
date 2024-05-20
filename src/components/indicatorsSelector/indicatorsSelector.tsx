import React, { useEffect, useState } from 'react';
import { fetchIndicators } from "../../requesters/indicatorsRequester";
import './styles.css';

interface IndicatorSelectorProps {
    onSelect: (indicatorCode: string) => void;
}

const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({ onSelect }) => {
    const [indicators, setIndicators] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const indicators = await fetchIndicators();
                setIndicators(indicators);
            } catch (error) {
                setError('Error fetching indicators');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const indicatorCode = event.target.value;
        setSelectedIndicator(indicatorCode);
        onSelect(indicatorCode);
    };

    return (
        <div className="indicator-selector">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <select onChange={handleChange} value={selectedIndicator || ''}>
                    <option value="">Select an indicator</option>
                    {Object.keys(indicators).map((name) => (
                        <option key={indicators[name]} value={indicators[name]}>
                            {name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default IndicatorSelector;
