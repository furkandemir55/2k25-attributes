import {useState} from "react";


const toggleColor = (color) => {
    switch (color) {
        case 'green':
            return 'red'
        case undefined:
            return 'green'
        default:
            return undefined
    }
}
export const Cell = ({children, ...props}) => {
    const [highlighted, setHighlighted] = useState();
    return <td {...props}
               style={highlighted ? {background: highlighted, color: 'white', fontWeight: 'bold'} : undefined}
               onClick={() => setHighlighted(prev => toggleColor(prev))}>{children}</td>
}
