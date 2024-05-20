import React from 'react';
import './styles.css';

interface FrequencySelectorProps {
    onSelect: (frequency: string) => void;
}

const FrequencySelector: React.FC<FrequencySelectorProps> = ({ onSelect }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    return (
        <div className="frequency-selector">
            <select onChange={handleChange}>
                <option value="">Select Frequency</option>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="date">Date</option>
            </select>
        </div>
    );
};

export default FrequencySelector;
