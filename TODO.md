# TODO

## 2020-07-02

- [ ] Arrumar criated_at no metodo PUT
- [ ] Adicionar mensagem com os dizeres de modelo carregando
- [ ] Add a Get By IP method

## 2020-07-01

- [ ] Avaliar a imagem sem ter que salvar uma copia antes
- [ ] Melhorar a visualização para celulares
- [ ] Adicionar tipo de operação offline
- [ ] Salvar os modelos no servidor
- [ ] Servir arquivos no servidor
- [ ] Paginar a tela de resultados
- [ ] Ao invés de C:\, utilizar como prefixo o endereço do servidor no armazenamento
- [x] Implementar modelos de tensorflow offline

## 2020-06-24

- [ ] Carregar todos os modelos de uma vez no servidor e verificar a performance

## 2020-06-23

- [ ] Destruir a camera ao sair de um menu
- [x] Abrir uma nova thread para processar as imagens

## 2020-06-22

- [ ] Exibir mensagem de Camera indisponível enquanto a camera não é carregada
- [ ] Adicionar mensagem nome e usuario do dispositvo no header
- [ ] Desenvolver telas de alteração de configuração
- [ ] Finalizar API de consulta e cadastro de instancias e equiapamentos
- [ ] Criar API para os resultados

## 2020-06-19

- [x] Adicionar a imagem o numero da peça, data e hora que foi tirada no servidor

## 2020-06-18

- [ ] Adicionar serviço de status de comunicação com o servidor
- [ ] Criar tabela de resultados
- [ ] Adicionar identificador ao resultado
- [x] Alterar o canvas dinamicamente
- [x] Retornar o IP do usuário mesmo que não cadastrado

## 2020-06-17

- [x] Corrigir desvio do leitor de codigo de barras para o Ipad (Adicionado um canvas dedicado)
- [x] Buscar o nome do modelo do classificador
- [x] Adicionar nome do modelo na instancia

## 2020-06-09

- [ ] Add a button to revoke/claim last sent result
- [ ] Home Screen
- [ ] Create a return arrow button
- [x] History/Logs Screen
- [x] OnLoad, device request its instance from server
- [x] Create a route system in Frontend
- [x] Create a menu button
- [x] Get more empty boxes pictures
- [x] Create a resizer to make fotos 640x480

## 2020-05-28

- [x] Resize a picture and send to a server as a BASE64 String
- [x] Receive and store the picture
- [x] Classify the image to recognize the OCR Digits
- [x] Create a camera preview for IOs (Needs iOS 13)
- [x] Capture a picture and make preview
- [x] Create a camera preview for Android (Chrome)

## 2020-05-27

- [x] A config containing infos about the model (input size, channels, model name, labels, threshold)
- [x] Create a tensorflow module for classification
- [x] Create a Log Module and a Log folder if not exists
- [x] Create a default folder to store the pictures (if not exists)
