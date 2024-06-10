import Http from "./Http";


export async function init (http: Http) {
	await http.route("get", "/books", function (params: any, body: any) {
		const books = [
			{ title: "Clean Code" },
			{ title: "Refactoring" },
			{ title: "Implementing Domain-Driven Design" }
		];
		return books;
	});
	http.listen(3002);
}
