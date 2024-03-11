import { validateCpf } from "./cpf_validator";

describe('CPF', () => {
    it('Should return false if cpf is null', () => {
        const cpf = null;

        const isValid = validateCpf(cpf as any);

        expect(isValid).toBe(false);
    })

    it('Should return false if cpf is undefined', () => {
        const cpf = undefined;

        const isValid = validateCpf(cpf as any);

        expect(isValid).toBe(false);
    })

    it('Should return false if cpf has less than 11 caracters', () => {
        const cpf = '1234567891';

        const isValid = validateCpf(cpf as any);

        expect(isValid).toBe(false);
    })

    it('Should return false if cpf has more than 14 caracters', () => {
        const cpf = '123456789112345';

        console.log(cpf.length);

        const isValid = validateCpf(cpf as any);

        expect(isValid).toBe(false);
    })

    it('Should return false if all characters are the same', () => {
        const cpf = '11111111111';

        const isValid = validateCpf(cpf);

        expect(isValid).toBe(false);
    })
    
})