import {useState} from 'react'

import './App.css'
import {data} from "./data.js";
import {Cell} from "./components/Cell.jsx";

function App() {

    const attributes = data.reduce((acc, cur) => {
        if (acc.includes(cur.Attribute)) return acc
        return [...acc, cur.Attribute]
    }, [])
    const [selectedAttributes, setSelectedAttributes] = useState(['Defensive Rebound', 'Driving Dunk', 'Steal'])

    const heights = data.reduce((acc, cur) => {
        if (acc.includes(cur.Height)) return acc
        return [...acc, cur.Height]
    }, [])
    const [selectedHeights, setSelectedHeights] = useState(["6'4", "6'6", "6'8"])


    const filteredData = data.filter(att => selectedHeights.includes(att.Height) && selectedAttributes.includes(att.Attribute)).toSorted((a, b) => a.Attribute - b.Attribute)

    const order = ['Height', 'Attribute', '25-74', '75-79', '80-84', '85-89', '90-94', '95-98', '99']
    return (<div className={'root'}>
        <div className={'selects'}>
            <select value={selectedHeights} multiple onChange={e => {
                const options = [...e.target.selectedOptions];
                const values = options.map(option => option.value);
                setSelectedHeights(values);
            }}>
                {heights.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
            <select value={selectedAttributes} multiple onChange={e => {
                const options = [...e.target.selectedOptions];
                const values = options.map(option => option.value);
                setSelectedAttributes(values);
            }}>
                {attributes.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
        </div>
        <table>
            <thead>
            <tr>
                {Object.keys(filteredData[0] ?? {})
                    .toSorted((a, b) => order.indexOf(a) - order.indexOf(b))
                    .map((attr) =>
                        <th key={attr}>{attr}</th>)}
            </tr>
            </thead>
            <tbody>
            {filteredData.map((att, i) => {
                console.log(selectedHeights.length % (i + 1))
                const isLastOfType = (i + 1) % selectedHeights.length === 0
                return (<tr className={isLastOfType ? 'last' : undefined} key={`${att.Height}-${att.Attribute}`}
                >
                    {Object.entries(att)
                        .toSorted((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
                        .map((val) => <Cell key={val[0]}
                                            val={`${att.Height}-${att.Attribute}-${val[0]}`}>{val[1]}</Cell>)}
                </tr>)
            })}
            </tbody>
        </table>
    </div>)
}

export default App
