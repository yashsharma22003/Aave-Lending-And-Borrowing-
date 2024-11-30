import { parseUnits, formatUnits } from "ethers";

function unitConvert(number) {
    if (typeof number !== "string") {
        number = number.toString();
    }

    // Parse the input as wei (smallest unit)
    const parsedNumber = parseUnits(number, "wei");

    // Format it to ether and limit the result to 4 decimal places
    const etherValue = formatUnits(parsedNumber, "ether");

    // Return the formatted value, rounded to 4 decimal places
    return parseFloat(etherValue).toFixed(4);
}

export default unitConvert;
