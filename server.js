const soap = require('soap');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8000;
// Implémentation des opérations du service
const calculatorService = {
 CalculatorService: {
 CalculatorPort: {
 // Opération Addition
 Add: function(args) {
 const result = parseFloat(args.a) + parseFloat(args.b);
 console.log(`Add: ${args.a} + ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Soustraction
 Subtract: function(args) {
 const result = parseFloat(args.a) - parseFloat(args.b);
 console.log(`Subtract: ${args.a} - ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Multiplication
 Multiply: function(args) {
 const result = parseFloat(args.a) * parseFloat(args.b);
 console.log(`Multiply: ${args.a} * ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Division
 Divide: function(args) {
 if (parseFloat(args.b) === 0) {
 throw {
 Fault: {
 Code: { Value: 'DIVIDE_BY_ZERO' },
 Reason: { Text: 'Division par zéro impossible' }
 }
 };
 }
 const result = parseFloat(args.a) / parseFloat(args.b);
 console.log(`Divide: ${args.a} / ${args.b} = ${result}`);
 return { result: result };
 },

 // Opération Modulo
 Modulo: function(args) {
 if (parseFloat(args.b) === 0) {
 throw {
 Fault: {
 Code: { Value: 'DIVIDE_BY_ZERO' },
 Reason: { Text: 'Division par zéro impossible' }
 }
 };
 }
 const result = parseFloat(args.a) % parseFloat(args.b);
 console.log(`Modulo: ${args.a} % ${args.b} = ${result}`);
 return { result: result };
 },

// Opération Power (puissance)
Power: function(args) {
  const a = parseFloat(args.a);
  const b = parseFloat(args.b);
  
  // Gérer les cas spéciaux
  if (b < 0 && a === 0) {
    throw {
      Fault: {
        Code: { Value: 'INVALID_POWER' },
        Reason: { Text: 'Impossible de calculer 0 à une puissance négative' }
      }
    };
  }
  
  const result = Math.pow(a, b);
  console.log(`Power: ${args.a} ^ ${args.b} = ${result}`);
  return { result: result };
},

// Conversions de température
CelsiusToFahrenheit: function(args) {
  const celsius = parseFloat(args.a);
  const fahrenheit = (celsius * 9/5) + 32;
  console.log(`CelsiusToFahrenheit: ${celsius}°C = ${fahrenheit}°F`);
  return { result: fahrenheit };
},

FahrenheitToCelsius: function(args) {
  const fahrenheit = parseFloat(args.a);
  const celsius = (fahrenheit - 32) * 5/9;
  console.log(`FahrenheitToCelsius: ${fahrenheit}°F = ${celsius}°C`);
  return { result: celsius };
},

CelsiusToKelvin: function(args) {
  const celsius = parseFloat(args.a);
  const kelvin = celsius + 273.15;
  console.log(`CelsiusToKelvin: ${celsius}°C = ${kelvin}K`);
  return { result: kelvin };
}

 }
 }
 };
// Lire le fichier WSDL
const wsdlPath = path.join(__dirname, 'calculator.wsdl');
const wsdl = fs.readFileSync(wsdlPath, 'utf8');
// Démarrer le serveur
app.listen(PORT, function() {
 console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);

 // Créer le service SOAP
 const server = soap.listen(app, '/calculator', calculatorService, wsdl);

 console.log(`🚀 WSDL disponible sur http://localhost:${PORT}/calculator?wsdl`);

 // Log des requêtes entrantes (debug)
 server.log = function(type, data) {
 console.log(`[${type}]`, data);
 };
});