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

    it('Should return false if cpf has less or more than 11 caracters', () => {
        const cpfLessElevenCharacters = '1234567891';
        const cpfMoreElevenCharacters = '123456789111111';

        const isValidLess11Characters = validateCpf(cpfLessElevenCharacters as any);
        const isValidMore11Characters = validateCpf(cpfMoreElevenCharacters as any);

        expect(isValidLess11Characters).toBe(false);
        expect(isValidMore11Characters).toBe(false);
    })

    it('Should return false if all characters are the same', () => {
        const cpf = '11111111111';

        const isValid = validateCpf(cpf);

        expect(isValid).toBe(false);
    })

    it('Should validate a valid cpf', () => {
        const cpf = '386.118.690-01';

        const isValid = validateCpf(cpf);

        expect(isValid).toBe(true);
    })

    it('Should return false if a cpf is not valid', () => {
        const cpf = '386.118.690-21';

        const isValid = validateCpf(cpf);

        expect(isValid).toBe(false);
    })
    
})