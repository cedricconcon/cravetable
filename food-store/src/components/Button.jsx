
export default function Button({ title, type, onClick }){
    return(
        <>
        <button className="bg-white text-orange-500 px-4 py-1 rounded-full font-semibold hover:bg-orange-100" type={type} onClick={onClick}>{title}</button>
        </>
    )
}