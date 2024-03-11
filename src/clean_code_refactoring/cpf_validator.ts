const MINIMUM_NUMBER_OF_DIGITS = 11;
const MAXIMUM_NUMBER_OF_DIGITS = 14;


export function validateCpf(cpf: string) {

    if (!cpf) return false;

    if(cpf.length < MINIMUM_NUMBER_OF_DIGITS || cpf.length > MAXIMUM_NUMBER_OF_DIGITS) return false; 

    const cpfString = getStringOnly(cpf); 

    const isDigitsAreTheSame = isAllDigitsAreTheSame(cpfString);

    if(isDigitsAreTheSame) return false;
    
    try{  
        let     d1, d2;  
        let     dg1, dg2, rest;  
        let     digito;  
            let     nDigResult;  
        d1 = d2 = 0;  
        dg1 = dg2 = rest = 0;  
            
        for (let nCount = 1; nCount < cpfString.length -1; nCount++) {  
            // if (isNaN(parseInt(str.substring(nCount -1, nCount)))) {
            // 	return false;
            // } else {

                digito = parseInt(cpfString.substring(nCount -1, nCount));  							
                d1 = d1 + ( 11 - nCount ) * digito;  

                d2 = d2 + ( 12 - nCount ) * digito;  
            // }
        };  
            
        rest = (d1 % 11);  

        dg1 = (rest < 2) ? dg1 = 0 : 11 - rest;  
        d2 += 2 * dg1;  
        rest = (d2 % 11);  
        if (rest < 2)  
            dg2 = 0;  
        else  
            dg2 = 11 - rest;  

            let nDigVerific = cpfString.substring(cpfString.length-2, cpfString.length);  
        nDigResult = "" + dg1 + "" + dg2;  
        return nDigVerific == nDigResult;
    }catch (e){  
        console.error("Erro !"+e);  

        return false;  
    }  
    

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

