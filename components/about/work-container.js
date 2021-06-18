
function Separator() {
	return (
		<div className="h-5/6 w-0 border-r-2 border-gray-600 my-auto"/>
	)
}

export default function WorkContainer({ jobInfo }) {
	const {
		companyName,
		jobTitle,
		jobTime,
		jobDescription
	} = jobInfo;



	return (
		<div className="w-full bg-white bg-opacity-20 rounded-md flex flex-row my-4 h-36 p-1.5 shadow-md transform transition hover:scale-110 duration-200">
			<div className="h-full w-48 flex justify-center">
				<img className="h-full" src="/react.svg.png"/>
			</div>
			<div className="w-48 flex justify-center items-center ml-4">
				<p className="font-bold font-serif">
					{companyName}
				</p>
			</div>
			<div className="flex flex-col ml-4">
				<p className="font-Bold text-xl">{jobTitle}</p>
				<div className="my-1 text-sm italic">{jobTime}</div>
				{
					jobDescription.map((duty) => <div>{duty}</div>)
				}
			</div>

		</div>
	)

}