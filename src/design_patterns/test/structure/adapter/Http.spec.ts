import axios from "axios";
import { init } from "../../../structural/adapter/main";
import ExpressHttp from "../../../structural/adapter/ExpressHttp";


describe("Http", () => {
  it.skip("Deve testar a API", async () => {
	await init(new ExpressHttp());

    const response = await axios({
      url: "http://localhost:3002/books",
      method: "get",
    });

    const books = response.data;
    expect(books).toHaveLength(3);
    const [book1, book2, book3] = books;
    expect(book1.title).toBe("Clean Code");
    expect(book2.title).toBe("Refactoring");
    expect(book3.title).toBe("Implementing Domain-Driven Design");
  });
});
