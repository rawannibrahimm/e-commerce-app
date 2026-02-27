
export default function CartSpinner() {
    return (
    <>
    <div className="h-[80vh] flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2a5631]" />
        <p className="text-gray-500 text-sm">Loading your cart...</p>
    </div>
    </>
    )
}
