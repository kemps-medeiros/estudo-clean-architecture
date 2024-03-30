import Cpf from "./Cpf"

describe("CPF", () => {
    it('should test a valid cpf', () => {
        const cpf = new Cpf("935.411.347-80");

        expect(cpf.getValue()).toBe("935.411.347-80");
    })

    it('should throw an error if cpf has all digits the same', () => {
        expect(() => new Cpf("111.111.111.-11")).toThrow(new Error("Cpf Inválido"));
    })
})