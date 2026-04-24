const soap = require('soap');
const WSDL_URL = 'http://localhost:8000/calculator?wsdl';
async function main() {
 try {
 // Créer le client SOAP
 const client = await soap.createClientAsync(WSDL_URL);

 console.log('✅ Client SOAP connecté !');
 console.log('🚀 Opérations disponibles:',
Object.keys(client.CalculatorService.CalculatorPort));
 console.log('\n--- Tests des opérations ---\n');
 // Test Addition
 const addResult = await client.AddAsync({ a: 10, b: 5 });
 console.log(`Addition: 10 + 5 = ${addResult[0].result}`);
 // Test Soustraction
 const subResult = await client.SubtractAsync({ a: 10, b: 3 });
 console.log(`Soustraction: 10 - 3 = ${subResult[0].result}`);
 // Test Multiplication
 const mulResult = await client.MultiplyAsync({ a: 4, b: 7 });
 console.log(`Multiplication: 4 × 7 = ${mulResult[0].result}`);
 // Test Division
 const divResult = await client.DivideAsync({ a: 20, b: 4 });
 console.log(`Division: 20 ÷ 4 = ${divResult[0].result}`);

/// Test Modulo
const modResult = await client.ModuloAsync({ a: 17, b: 5 });
console.log(`Modulo: 17 % 5 = ${modResult[0].result}`);

// Test Power
const powResult = await client.PowerAsync({ a: 2, b: 8 });
console.log(`Power: 2 ^ 8 = ${powResult[0].result}`);

// Test Power avec exposant négatif
const powNegResult = await client.PowerAsync({ a: 2, b: -2 });
console.log(`Power: 2 ^ -2 = ${powNegResult[0].result}`);

// Test erreur: 0^-1
console.log('\n--- Test erreur: 0 à puissance négative ---');
try {
  await client.PowerAsync({ a: 0, b: -1 });
} catch (error) {
  console.log('❌ Erreur capturée:',
    error.root?.Envelope?.Body?.Fault?.Reason?.Text || error.message);
}

 // Test Division par zéro (erreur)
 console.log('\n--- Test erreur: Division par zéro ---');
 try {
 await client.DivideAsync({ a: 10, b: 0 });
 } catch (error) {
 console.log('❌ Erreur capturée:',
error.root?.Envelope?.Body?.Fault?.Reason?.Text || error.message);
 }

// Test Celsius to Fahrenheit
console.log('\n--- Tests conversions de température ---\n');
const c2fResult = await client.CelsiusToFahrenheitAsync({ a: 0, b: 0 });
console.log(`0°C = ${c2fResult[0].result}°F`);

// Test Fahrenheit to Celsius
const f2cResult = await client.FahrenheitToCelsiusAsync({ a: 32, b: 0 });
console.log(`32°F = ${f2cResult[0].result}°C`);

// Test Celsius to Kelvin
const c2kResult = await client.CelsiusToKelvinAsync({ a: 0, b: 0 });
console.log(`0°C = ${c2kResult[0].result}K`);

 } catch (error) {
 console.error('Erreur de connexion:', error.message);
 }
}
main();