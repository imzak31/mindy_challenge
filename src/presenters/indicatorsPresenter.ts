// src/presenters/indicatorsPresenter.ts

import { indicatorDateLimits } from '../utils/indicatorDateLimits';

interface Indicator {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    fecha: string;
    valor: number;
}

interface ApiResponse {
    [key: string]: Indicator | string | any;
}

interface Series {
    fecha: string;
    valor: number;
}

export interface IndicatorSeries {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    serie: Series[];
}

export const parseIndicatorsList = (data: ApiResponse) => {
    const indicators: { [key: string]: string } = {};

    Object.keys(data).forEach(key => {
        if (typeof data[key] === 'object' && (data[key] as Indicator).codigo) {
            const indicator = data[key] as Indicator;
            indicators[indicator.nombre] = indicator.codigo;
        }
    });

    return indicators;
};

export const validateDate = (indicator: string, date: string): boolean => {
    if (indicator in indicatorDateLimits) {
        const limitDate = indicatorDateLimits[indicator];
        return new Date(date) >= new Date(limitDate);
    }
    return true;
};

export const getIndicatorSeries = (data: any): IndicatorSeries => {
    const { codigo, nombre, unidad_medida, serie } = data;
    return {
        codigo,
        nombre,
        unidad_medida,
        serie: serie.map((item: any) => ({
            fecha: item.fecha,
            valor: item.valor,
        })),
    };
};
