import apiRoutes from '../routes/apiRoutes';
import { parseIndicatorsList, getIndicatorSeries } from '../presenters/indicatorsPresenter';

export const fetchIndicators = async () => {
    try {
        const response = await fetch(apiRoutes.all_indicators);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const indicators = parseIndicatorsList(result);
        return indicators;
    } catch (error) {
        console.error('Error fetching indicators:', error);
        throw error;
    }
};

export const fetchIndicatorSeries = async (indicatorCode: string) => {
    try {
        const response = await fetch(`${apiRoutes.all_indicators}/${indicatorCode}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return getIndicatorSeries(result);
    } catch (error) {
        console.error(`Error fetching series for ${indicatorCode}:`, error);
        throw error;
    }
};

export const fetchIndicatorByDate = async (indicatorCode: string, date: string) => {
    try {
        const response = await fetch(`${apiRoutes.all_indicators}/${indicatorCode}/${date}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return getIndicatorSeries(result);
    } catch (error) {
        console.error(`Error fetching series for ${indicatorCode} on ${date}:`, error);
        throw error;
    }
};

export const fetchIndicatorByYear = async (indicatorCode: string, year: string) => {
    try {
        const response = await fetch(`${apiRoutes.all_indicators}/${indicatorCode}/${year}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return getIndicatorSeries(result);
    } catch (error) {
        console.error(`Error fetching series for ${indicatorCode} in ${year}:`, error);
        throw error;
    }
};
