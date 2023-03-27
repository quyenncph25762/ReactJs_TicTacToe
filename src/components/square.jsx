const Square = ({ onPay, className, value }) => {
    return <>
        <button onClick={onPay} className={`h-[120px] w-[120px] bg-[#14BDAC] text-[76px] text-white shadow-2xl ${className}`} > {value}</button >
    </>
}

export default Square