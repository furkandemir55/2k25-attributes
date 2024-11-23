import {selectedCellsAtom} from "../atoms.js";
import {useAtom} from "jotai";
import {memo, useMemo} from "react";

const toggleCell = (selectedCells, val) => {
    const existingCell = selectedCells.find(cell => cell.val === val)
    if (existingCell) {
        return selectedCells.map(cell => ({...cell, color: cell.val === val ? toggleColor(cell.color) : cell.color}))
    } else return [...selectedCells, {val, color: toggleColor()}]
}

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
export const Cell = memo(({children, val, ...props}) => {
        const [selectedCells, setSelectedCells] = useAtom(selectedCellsAtom);
        const highlightVal = useMemo(() => selectedCells.find(cell => cell.val === val), [selectedCells, val])
        return <td {...props}
                   style={highlightVal?.color ? {
                       background: highlightVal.color,
                       color: 'white',
                       fontWeight: 'bold'
                   } : undefined}
                   onClick={() => setSelectedCells(prev => toggleCell(prev, val))}>{children}</td>
    }
)