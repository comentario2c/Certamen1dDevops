const { calcularPonderado } = require('../logica');
const { test, expect } = require('@jest/globals');

test('Debe calcular correctamente un promedio aprobatorio', () => {
    expect(calcularPonderado(60, 60, 60, 60)).toBe(60);
});

test('Debe calcular correctamente con notas variadas', () => {
    expect(calcularPonderado(10, 20, 30, 40)).toBe(30);
});

test('Debe manejar valores nulos o vacíos como 0', () => {
    expect(calcularPonderado(100, null, 100, "")).toBe(40); 
});