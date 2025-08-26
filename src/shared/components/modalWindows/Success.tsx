
export interface SuccessMessageProps{
    successMessage:string
}
export function Success({successMessage}:SuccessMessageProps) {
    return(<div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-10">
        {successMessage}
    </div>)
}