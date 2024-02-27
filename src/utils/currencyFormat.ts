export const currencyFormat=(value:number)=>{
    return new Intl.NumberFormat('ens-HN',{
        currencySign: "standard",
        style: "currency",
        minimumIntegerDigits: 2,
        maximumSignificantDigits: 2,
        currency: "HNL"
    }).format(value)
}