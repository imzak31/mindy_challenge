import React, { useState, useEffect } from 'react';
import { indicatorDateLimits } from '../../utils/indicatorDateLimits';
import './styles.css';

interface DatePickerProps {
    indicatorCode: string | null;
    frequency: string | null;
    onDateSelect: (date: string) => void;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ indicatorCode, frequency, onDateSelect }) => {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [day, setDay] = useState<number>(new Date().getDate());
    const [minDate, setMinDate] = useState<string>('1900-01-01');
    const [maxDate, setMaxDate] = useState<string>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (indicatorCode && indicatorDateLimits[indicatorCode]) {
            setMinDate(indicatorDateLimits[indicatorCode]);
        }
    }, [indicatorCode]);

    useEffect(() => {
        if (frequency === 'yearly') {
            onDateSelect(`${year}`);
        } else if (frequency === 'monthly') {
            onDateSelect(`${year}-${String(month).padStart(2, '0')}`);
        } else if (frequency === 'date') {
            onDateSelect(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        }
    }, [year, month, day, frequency, onDateSelect]);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setYear(Number(e.target.value));
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonth(Number(e.target.value));
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(Number(e.target.value));
    };

    const generateYears = () => {
        const minYear = new Date(minDate).getFullYear();
        const maxYear = new Date(maxDate).getFullYear();
        const years = [];
        for (let i = minYear; i <= maxYear; i++) {
            years.push(i);
        }
        return years;
    };

    const generateMonths = () => {
        return Array.from({ length: 12 }, (_, i) => i + 1);
    };

    const generateDays = () => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    return (
        <div className="date-picker">
            <select className="date-picker-year" onChange={handleYearChange} value={year}>
                {generateYears().map(y => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
            {frequency !== 'yearly' && (
                <select className="date-picker-month" onChange={handleMonthChange} value={month}>
                    {generateMonths().map(m => (
                        <option key={m} value={m}>
                            {String(m).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            )}
            {frequency === 'date' && (
                <select className="date-picker-day" onChange={handleDayChange} value={day}>
                    {generateDays().map(d => (
                        <option key={d} value={d}>
                            {String(d).padStart(2, '0')}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default CustomDatePicker;