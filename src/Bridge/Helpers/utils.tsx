import { ContractType } from "../../model"

export const getSymbol = (type: ContractType) => {
    switch (type) {
        case 'Clubs': return (<span style={{ color: 'green' }}>&clubs;</span>)
        case 'Diamonds': return (<span style={{ color: 'orange' }}>&diams;</span>)
        case 'Hearts': return (<span style={{ color: 'red' }}>&hearts;</span>)
        case 'Spades': return (<span style={{ color: 'blue' }}>&spades;</span>)
        case 'NoTrump': return (<span>NT</span>);
        default: return ''
    }
}