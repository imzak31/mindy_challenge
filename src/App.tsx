import React, { useState } from 'react';
import './App.css';
import IndicatorSelector from "./components/indicatorsSelector/indicatorsSelector";
import FrequencySelector from "./components/indicatorFrequencySelector/indicatorsFrequencySelector";
import CustomDatePicker from "./components/indicatorDatePicker/indicatorsDatePicker";
import Graph from "./components/indicatorsGraphicBuilder/indicatorsGraphicBuilder";

function App() {
    const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
    const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleIndicatorSelect = (indicatorCode: string) => {
        setSelectedIndicator(indicatorCode);
    };

    const handleFrequencySelect = (frequency: string) => {
        setSelectedFrequency(frequency);
    };

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className="App">
            <main className="App-main">
                <div className="selectors-container">
                    <IndicatorSelector onSelect={handleIndicatorSelect} />
                    <FrequencySelector onSelect={handleFrequencySelect} />
                    {selectedIndicator && selectedFrequency && (
                        <CustomDatePicker
                            indicatorCode={selectedIndicator}
                            frequency={selectedFrequency}
                            onDateSelect={handleDateSelect}
                        />
                    )}
                </div>
                {selectedIndicator && selectedFrequency && selectedDate && (
                    <Graph indicatorCode={selectedIndicator} frequency={selectedFrequency} date={selectedDate} />
                )}
            </main>
        </div>
    );
}

export default App;
