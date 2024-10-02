export default function MenuFooter({ type, isDeleting, resetForm, submitForm }) {
    return (
        <div
            className={`flex flex-row justify-left gap-3 ${isDeleting && "blur-sm"
                }`}
        >
            <div className="flex grow justify-start">
                <button
                    className="w-full h-10 rounded-lg text-lg bg-red-600 text-accent-white hover:bg-red-700"
                    onClick={resetForm}
                >
                    Cancel
                </button>
            </div>

            <div className="flex grow justify-end">
                <button
                    className={`w-full h-10 rounded-lg text-lg ${type == "add"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                        } text-accent-white`}
                    onClick={submitForm}
                >
                    {type == "add" ? "Create" : "Save"}
                </button>
            </div>
        </div>
    )
}