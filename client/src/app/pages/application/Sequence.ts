// Verificar a configuração da aplicação
// 0 - Leitura de Barcode
// 1 - Leitura de OCR
// 2 - Classificação de imagem no servidor
// 3 - Classificação de imagem no cliente
// 4 - Armazenamento de imagem

// Verificar tipo de validação inicial
// 0 - Leitura de barcode Local
// 1 - Leitura de OCR
// 2 - Sem leitura
// 3 - Barcode Servidor


// Device type for rendering

// Intruções / Steps
// Application Type | Read Type | Step Number

// 000 - Aproxime o leitor a um codigo de barras
// 001 - Resultado: (exibir imagem com quadrado sobre a imagem scaneada) / Botao efetuar nova leitura

// 010 - Fotografe os caracteres que deseja identificar
// 011 - Deseja enviar imagem para o servidor?
// 012 - Resultado: XXXX / Efetuar nova leitura

// 020 - Realize a leitura do codigo de barras
// 021 - Fotografe o objeto desejado para a classificação
// 022 - Deseja enviar imagem para o servidor?
// 023 - Imagem salva com sucesso (mostrar resultado e botão para a proxima leitura)
export const sequence = {
  '000': 'A',
  '001': 'B',
  '010': 'C',
  '011': 'D',
  '012': 'E',
  '020': 'F',
  '021': 'G',
  '022': 'H',
  '201': 'LEIA O CODIGO DE BARRAS',
  '202': 'FOTOGRAFE A PEÇA',
  '203': 'VERIFICAR E ENVIAR AO SERVIDOR',
  '204': 'OK',
  '999': 'Inicializando'
}
