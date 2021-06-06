export default function BlogEntry({ blog }){
    const {
        title,
        date,
        slug,
        author,
        excerpt
    } = blog;

    return (
        <div className="group md:w-1/3 w-full bg-green cursor-pointer m-2 h-60 p-2
        border-2
        border-transparent
        overflow-hidden
        hover:bg-gray-300 
        hover:bg-opacity-25
        hover:border-gray-400">
            <div>
                <p className="font-serif text-xl
                border-b-2
                border-gray-400
                border-transparent
                group-hover:border-gray-500">{title}</p>
                <p className="italic text-xs my-1">{date + " " + author.name}</p>
                <p className="font-sans">{excerpt}</p>
            </div>
        </div>
    )
}