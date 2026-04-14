const express = require('express');
const app = express();
const { calcularPonderado } = require('./logica');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
      <!doctype html>
      <html lang="es" class="dark">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script> <title>Calculadora de Notas | Escala 100</title>
        </head>
        <body class="bg-[#0A0A0C] text-gray-100 font-sans antialiased flex items-center justify-center min-h-screen p-4">
          
          <div class="w-full max-w-md bg-[#1C1C1E] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
            <div class="px-8 pt-10 pb-6">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-2xl mb-4">
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h1 class="text-3xl font-bold tracking-tight text-white">Calculadora</h1>
              <p class="text-gray-400 text-sm mt-1">Escala Universitaria (1 - 100)</p>
            </div>

            <form action="/calcular" method="POST" class="px-8 pb-8 space-y-3">
              ${[
                { id: 'n1', label: 'Nota 1', peso: '10%' },
                { id: 'n2', label: 'Nota 2', peso: '20%' },
                { id: 'n3', label: 'Nota 3', peso: '30%' },
                { id: 'n4', label: 'Nota 4', peso: '40%' }
              ].map(nota => `
                <div class="group flex items-center justify-between bg-[#2C2C2E]/50 hover:bg-[#2C2C2E] p-4 rounded-2xl transition-all border border-transparent focus-within:border-blue-500/50">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-200">${nota.label}</span>
                    <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">${nota.peso}</span>
                  </div>
                  <input type="number" step="1" name="${nota.id}" min="1" max="100" 
                    class="bg-transparent text-right outline-none text-blue-400 font-mono text-xl w-20 class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    placeholder="0" required>
                </div>
              `).join('')}

              <div class="pt-4">
                <button type="submit" 
                  class="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.97] text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-blue-600/20">
                  Calcular Promedio
                </button>
              </div>
            </form>
        </body>
      </html>
    `);
});

app.post('/calcular', (req, res) => {
    const { n1, n2, n3, n4 } = req.body;
    
    const resultado = calcularPonderado(
        parseFloat(n1) || 0, 
        parseFloat(n2) || 0, 
        parseFloat(n3) || 0, 
        parseFloat(n4) || 0
    );

    const colorClase = resultado >= 51 ? 'text-blue-400' : 'text-red-400';

    res.send(`
      <!doctype html>
      <html lang="es" class="dark">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <title>Resultado | Calculadora</title>
        </head>
        <body class="bg-[#0A0A0C] text-gray-100 font-sans antialiased flex items-center justify-center min-h-screen p-4">
          
          <div class="w-full max-w-md bg-[#1C1C1E] rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5 text-center">
            <div class="px-8 pt-12 pb-8">
              <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Resultado Final</h2>
              
              <div class="relative flex items-center justify-center w-40 h-40 mx-auto my-8 border-4 border-gray-800 rounded-full">
                <div class="flex flex-col items-center">
                  <span class="text-5xl font-black ${colorClase}">${resultado.toFixed(1)}</span>
                  <span class="text-xs text-gray-500 font-medium">puntos</span>
                </div>
              </div>

              <p class="text-gray-400 text-sm mb-8 px-4">
                El promedio ponderado se calculó exitosamente bajo los criterios de evaluación del curso.
              </p>

              <a href="/" 
                class="inline-block w-full bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white font-bold py-4 rounded-2xl transition-all duration-200 active:scale-[0.97]">
                Realizar otro cálculo
              </a>
            </div>
          </div>

        </body>
      </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));