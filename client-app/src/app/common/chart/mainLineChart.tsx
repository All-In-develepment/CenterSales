import { observer } from 'mobx-react-lite';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
    over15: number[]
    over25: number[]
    under25: number[]
    ambasMarcam: number[]
    casaHT: number[]
    empateHT: number[]
    visitanteHT: number[]
    casaFT: number[]
    empateFT: number[]
    visitanteFT: number[]
    empateOuCasa: number[]
    visitanteOuCasa: number[]
    empateOuVisitante: number[]
    width: number
    height: number
    marginRight: number
    marginLeft: number
}


export default observer(function MainLineChart({ over15, over25, under25, ambasMarcam, casaHT, empateHT, visitanteHT, casaFT, empateFT, visitanteFT, empateOuCasa, visitanteOuCasa, empateOuVisitante, width, height, marginLeft, marginRight }: Props) {
    // Dados fictícios para o gráfico
    const data = [
        { name: '1', over15: over15[0], over25: over25[0], under25: under25[0], ambas: ambasMarcam[0] },
        { name: '2', over15: over15[1], over25: over25[1], under25: under25[1], ambas: ambasMarcam[1] },
        { name: '3', over15: over15[2], over25: over25[2], under25: under25[2], ambas: ambasMarcam[2] },
        { name: '4', over15: over15[3], over25: over25[3], under25: under25[3], ambas: ambasMarcam[3] },
        { name: '5', over15: over15[4], over25: over25[4], under25: under25[4], ambas: ambasMarcam[4] },
        { name: '6', over15: over15[5], over25: over25[5], under25: under25[5], ambas: ambasMarcam[5] },
        { name: '7', over15: over15[6], over25: over25[6], under25: under25[6], ambas: ambasMarcam[6] },
        { name: '8', over15: over15[7], over25: over25[7], under25: under25[7], ambas: ambasMarcam[7] },
        { name: '9', over15: over15[8], over25: over25[8], under25: under25[8], ambas: ambasMarcam[8] },
        { name: '10', over15: over15[9], over25: over25[9], under25: under25[9], ambas: ambasMarcam[9] },
        { name: '11', over15: over15[10], over25: over25[10], under25: under25[10], ambas: ambasMarcam[10] },
        { name: '12', over15: over15[11], over25: over25[11], under25: under25[11], ambas: ambasMarcam[11] },
        { name: '13', over15: over15[12], over25: over25[12], under25: under25[12], ambas: ambasMarcam[12] },
        { name: '14', over15: over15[13], over25: over25[13], under25: under25[13], ambas: ambasMarcam[13] },
        { name: '15', over15: over15[14], over25: over25[14], under25: under25[14], ambas: ambasMarcam[14] },
        { name: '16', over15: over15[15], over25: over25[15], under25: under25[15], ambas: ambasMarcam[15] },
        { name: '17', over15: over15[16], over25: over25[16], under25: under25[16], ambas: ambasMarcam[16] },
        { name: '18', over15: over15[17], over25: over25[17], under25: under25[17], ambas: ambasMarcam[17] },
        { name: '19', over15: over15[18], over25: over25[18], under25: under25[18], ambas: ambasMarcam[18] },
        { name: '20', over15: over15[19], over25: over25[19], under25: under25[19], ambas: ambasMarcam[19] },
    ];

    return(
        <LineChart
            width={ width }
            height={ height}
            data={data}
            margin={{
            top: 5,
            right: marginRight,
            left: marginLeft,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="over15" stroke="#ff0000" />
            <Line type="monotone" dataKey="over25" stroke="#85c2a6" />
            <Line type="monotone" dataKey="under25" stroke="#ffff00" />
            <Line type="monotone" dataKey="ambas" stroke="#00ff00" />
        </LineChart>
    )
});
