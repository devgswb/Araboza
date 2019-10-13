데이터 자료형:
{
	code: "",
	year: "",
	month: "",
	day: "",
	time: "",
	data: [
		{
			title: ""
			words: [
				{morpheme: "",
				type: ""}
			],
		},

	]
}

db.wordsByTest.aggregate(
    {$unwind: "$data"},
    {$match: {"data.title" : {$regex: /대통령/}}},
    {$project: {"title": "$data.title", "words": "$data.words"}}
)