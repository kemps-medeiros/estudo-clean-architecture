export default class Cpf {
    private value: string;

    private NUMBER_OF_DIGITS = 11;
    private FACTOR_TO_CALCULATE_DIGIT_ONE = 10;
    private FACTOR_TO_CALCULATE_DIGIT_TWO = 11;
    
    constructor(value: string) {
        if (!this.validate(value)) {
            throw new Error("Cpf Inválido");
        };
        this.value = value
    }

    getValue() {
        return this.value;
    }

    private validate(cpf: string): boolean {
        if (!cpf) return false;

        const cpfString = this.getStringOnly(cpf); 

        if(cpfString.length != this.NUMBER_OF_DIGITS) return false; 
    
        if(this.isAllDigitsAreTheSame(cpfString)) return false;
    
        const firstVerificationDigit = this.getFirstVerificationDigit(cpfString);
        const secondVerificationDigit = this.getSecondVerificationDigit(firstVerificationDigit, cpfString);
    
        const resultExpected = `${firstVerificationDigit}${secondVerificationDigit}`;
    
        const digitsToValidate = cpfString.slice(cpfString.length -2);
        
        return digitsToValidate === resultExpected;
    }

    private getStringOnly(string: string) {
        return string
                        .replace('.','')
                        .replace('.','')
                        .replace('-','')
                        .replace(" ","");
    }
    
    private isAllDigitsAreTheSame(cpfString: string) {
        return cpfString.split("").every(digit => digit === cpfString[0]);
    }
    
    private getFirstVerificationDigit(cpf: string) {
        let firstNineCharacter = cpf.slice(0, -2);
        const firstDigit = this.calculateVerificatorDigitByFactor(this.FACTOR_TO_CALCULATE_DIGIT_ONE, firstNineCharacter);
        return firstDigit;
    }
    
    private getSecondVerificationDigit(firstDigitVerificator: string, cpf: string) {
        let firstNineCharacter = cpf.slice(0, -2);
        let cpfStringMoreOneDigit = firstNineCharacter + firstDigitVerificator;
        const secondDigit = this.calculateVerificatorDigitByFactor(this.FACTOR_TO_CALCULATE_DIGIT_TWO, cpfStringMoreOneDigit);
        return secondDigit;
    }
    
    private calculateVerificatorDigitByFactor(factor: number, cpfStringBase: string) {
        let counter = factor;
        let sum = 0;
        for (const number of cpfStringBase) {
            sum = sum + (Number(number) * counter)
            counter--
        }
    
        let remainderOfDivision = sum%11;
    
        const result = remainderOfDivision < 2 ? 0 : (11 - remainderOfDivision);
    
        return result.toString();
    }
}