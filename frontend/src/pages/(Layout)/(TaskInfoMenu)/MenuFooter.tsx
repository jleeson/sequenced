export default function MenuFooter({ type, isDeleting, resetForm, submitForm }) {
    return (
        <div
            className={`flex flex-row justify-left gap-3 ${isDeleting && "blur-sm"
                }`}
        >
            <div className="flex grow justify-start">
                <button
                    className="w-full h-10 rounded-lg text-lg bg-white border border-solid border-accent-blue-500 text-accent-blue-500 hover:bg-accent-blue-500 hover:text-accent-white"
                    onClick={resetForm}
                >
                    Cancel
                </button>
            </div>

            <div className="flex grow justify-end">
                <button
                    className={`w-full h-10 rounded-lg text-lg bg-accent-blue-500  hover:bg-accent-blue-700 text-accent-white`}
                    onClick={submitForm}
                >
                    {type == "add" ? "Create" : "Save"}
                </button>
            </div>
        </div>
    )
}