import { useState } from "react";

function BlogItemSmall({ children, className }){
	return (
		<div className={`bg-gray-500 w-12 h-12 border-b-2 border-black ${className}`}>
			{children}
		</div>
	) 
}

function BlogItemBase({ children, className }){
	return (
		<div className={`bg-gray-500 w-44 h-12 border-b-2 border-black ${className}`}>
			<div className="p-4 border-l-8 border-transparent hover:border-black">
				{children}
			</div>
		</div>
	)
}

export default function BlogSidebar({ allPosts }) {

	const [showFull, setShowFull] = useState(false);

	const onMouseEnter = () => {
		setShowFull(true)
	};

	const onMouseLeave = () => {
		setShowFull(false)
	};

	return (
		<div className={`fixed w-44 h-full bg-gray-700 top-2 transform duration-100 overflow-y-scroll
		${showFull ? "translate-x-0" : "-translate-x-32"} `}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}>
			<div className={`flex flex-col max-h-full
			${showFull ? "items-start" : "items-end"}`}>
				<div>
					{
						showFull ?
						<BlogItemBase>
							<p className="bold">Home</p>
						</BlogItemBase> :
						<BlogItemSmall>
							<img src="/assets/home.png" 
							className="w-full h-full p-4" 
							alt="home" ></img>
						</BlogItemSmall>
					}
				</div>

				<div>
					{
						
					}
				</div>
			</div>
		</div>
	)
}
