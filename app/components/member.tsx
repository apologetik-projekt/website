
type Member = {
	image: {
		url: string,
	}[],
	name: string,
	description: string,
}

interface Props {
	member: Member,
}

export default function Member({member}: Props) {
	return (
		<div className="w-full md:w-1/2 md:px-4 mt-2 mb-8">
			<figure className="bg-blue-300">
				<img className="object-cover aspect-[16/11]" src={member.image[0].url} alt={member.name} width="900" height="550" />
			</figure>
			<h3 className="font-bold text-2xl m-0.5 mt-3">{member.name}</h3>
			<p className="mx-0.5 text-gray-900">{member.description}</p>
    </div>
	)
}