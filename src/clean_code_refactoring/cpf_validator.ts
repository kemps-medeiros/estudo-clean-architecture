const NUMBER_OF_DIGITS = 11;
const FACTOR_TO_CALCULATE_DIGIT_ONE = 10;
const FACTOR_TO_CALCULATE_DIGIT_TWO = 11;


export function validateCpf(cpf: string) {

    if (!cpf) return false;

    const cpfString = getStringOnly(cpf); 
    if(cpfString.length != NUMBER_OF_DIGITS) return false; 

    if(isAllDigitsAreTheSame(cpfString)) return false;

    const firstVerificationDigit = getFirstVerificationDigit(cpfString);
    const secondVerificationDigit = getSecondVerificationDigit(firstVerificationDigit, cpfString);

    const resultExpected = `${firstVerificationDigit}${secondVerificationDigit}`;

    const digitsToValidate = cpfString.slice(cpfString.length -2);
    
    return digitsToValidate === resultExpected;

}

function getStringOnly(string: string) {
    return string
                    .replace('.','')
                    .replace('.','')
                    .replace('-','')
                    .replace(" ","");
}

function isAllDigitsAreTheSame(cpfString: string) {
    return cpfString.split("").every(digit => digit === cpfString[0]);
}

function getFirstVerificationDigit(cpf: string) {
    let firstNineCharacter = cpf.slice(0, -2);
    const firstDigit = calculateVerificatorDigitByFactor(FACTOR_TO_CALCULATE_DIGIT_ONE, firstNineCharacter);
    return firstDigit;
}

function getSecondVerificationDigit(firstDigitVerificator: string, cpf: string) {
    let firstNineCharacter = cpf.slice(0, -2);
    let cpfStringMoreOneDigit = firstNineCharacter + firstDigitVerificator;
    const secondDigit = calculateVerificatorDigitByFactor(FACTOR_TO_CALCULATE_DIGIT_TWO, cpfStringMoreOneDigit);
    return secondDigit;
}

function calculateVerificatorDigitByFactor(factor: number, cpfStringBase: string) {
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