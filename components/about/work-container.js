
export default function WorkContainer({ jobInfo }) {
	const {
		jobTitle,
		jobTime,
		jobDescription
	} = jobInfo;

	return (
		<div className="w-full bg-white rounded-md flex flex-col mt-4">
			<div>{jobTitle}</div>
			<div>{jobTime}</div>
			<div>{jobDescription}</div>
		</div>
	)

}