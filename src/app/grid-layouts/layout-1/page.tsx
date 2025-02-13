export default function Page() {
    return (
        <div className="flex flex-col md:flex-row max-h-[var(--page-height-minus-header)] pt-0">
            <div className="w-full md:w-1/3 p-4 pt-0">
                {/* Content for the first column */}
                <div className="space-y-4 overflow-auto h-full">
                    <div className="bg-gray-100 rounded-lg h-96">Item 1</div>
                    <div className="bg-gray-100 rounded-lg h-96">Item 2</div>
                    <div className="bg-gray-100 rounded-lg h-96">Item 3</div>
                    <div className="bg-gray-100 rounded-lg h-96">Item 4</div>
                </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col p-4 space-y-4 pt-0">
                <div className="flex-1 overflow-auto bg-gray-100 border-b rounded-lg">
                    {/* Content for the first row of the second column */}
                    <div className="p-4">First Row Content</div>
                </div>
                <div className="flex-1 overflow-auto bg-gray-100 rounded-lg">
                    {/* Content for the second row of the second column */}
                    <div className="p-4">Second Row Content</div>
                </div>
            </div>
        </div>
    );
}
  