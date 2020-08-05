# TODO

## 2020-08-05

- [ ] Melhorar o layout da pagina modelos
- [ ] Ao deletar uma instância, é necessário deletar também todos os devices que tem ela associada
- [ ] Impedir que o usuário delete a instância de ID = 1 (default)
- [ ] Log user actions

## 2020-08-04

- [x] Criar botão para recarregar no Navbar

## 2020-08-03

- [ ] Verificar o nome do arquivo antes de salva-lo, já fará com que classifique se é cliente ou servidor, remover os parenteses ao verificar o nome
- [ ] Inverter o Upload com a seleção de cliente ou servidor

## 2020-08-02

- [ ] Validar o IP antes de criar o cadastro em Config
- [ ] Adicionar um ícone para o projeto
- [ ] Adicionar Datepicker na pagina logs
- [ ] Adicionar o nome do modelo e data na querystring de busca dos resultados
- [x] Alterar a pasta padrão dos modelos salvos
- [-] Ao iniciar o programa, copiar as pastas dos modelos dos clientes para a pasta assets (Não mais necessario apos reorganização das pastas)
- [x] Reduzir o tamanho do timestamp nos logs
- [x] Substituir valores numericos por Strings em Config Devices

## 2020-07-31

- [ ] Adicionar metodo para recarregar os modelos no servidor após salva-los
- [ ] Verificar se o modelo possui as duas instancias... caso nao tiver o servidor não habilitar a camera, caso não tenha a do cliente não habilitar a inferencia caso nao tenha as duas bloquear a camera
- [ ] Trazer apenas os 10 logs gerais e só resgatar o restante após selecionar a instância
- [ ] Criar modal para ver mais os 10 ultimos resultados de inferência
- [x] Limpar campos no dispositivo após a inclusão
- [x] Colocar botões de configurações e de inclusão na linha de baixo

## 2020-07-22

- [ ] Quando deletar uma instancia, deletar tambem as pastas envolvidas
- [ ] Liberar botão de tirar foto somente se estiver em OK - (Opcional)
- [ ] Fazer busca nos logs por data e instancia
- [ ] Pintar linhas OKs e NOT_OKs nos Logs
- [ ] Pintar linhas OKs e NOT_OKs nas configurações da instância
- [x] Adicionar coluna nas instâncias que diga se há ou não modelos relacionados
- [x] Criar uma pag para gerenciar modelos, eles devem conter 1 - JS Model (cliente), 2 - Keras Model(servidor), 3 - Instance list

## 2020-07-15

- [x] Adicionar Select para campos não mutaveis nas configurações (deviceType, identifierMode, instanceType, save)
- [x] Adicionar componentes de tabelas especificas para as configurações
- [x] Alterar input text para select no campo instancia na tabela Device
- [x] Fazer botao de input para subir os modelos
- [x] Criar serviço para salvar os modelos em pasta de acordo com o nome

## 2020-07-13

- [x] Criar serviço no Cliente para identificar comunicação com o servidor

## 2020-07-02

- [x] Adicionar mensagem com os dizeres de modelo carregando
- [x] Arrumar criated_at no metodo PUT
- [x] Update the server URL Address
- [x] Render camera within a canvas
- [x] Remove some files in gitignore (static)

## 2020-07-01

- [x] Adicionar tipo de operação offline
- [x] Melhorar a visualização para celulares
- [x] Avaliar a imagem sem ter que salvar uma copia antes
- [x] Salvar os modelos no servidor
- [x] Servir arquivos no servidor
- [x] Paginar a tela de resultados
- [x] Ao invés de C:\, utilizar como prefixo o endereço do servidor no armazenamento
- [x] Implementar modelos de tensorflow offline

## 2020-06-24

- [x] Carregar todos os modelos de uma vez no servidor e verificar a performance (mais rapido)

## 2020-06-23

- [x] Destruir a camera ao sair de um menu
- [x] Abrir uma nova thread para processar as imagens

## 2020-06-22

- [x] Adicionar mensagem nome e usuario do dispositvo no header
- [x] Exibir mensagem de Camera indisponível enquanto a camera não é carregada
- [x] Criar telas de alteração de configuração dos dispositivos e instâncias
- [x] Finalizar API de consulta e cadastro de instancias e equipamentos
- [x] Criar API para os resultados

## 2020-06-19

- [x] Adicionar a imagem o numero da peça, data e hora que foi tirada no servidor

## 2020-06-18

- [x] Adicionar serviço de status de comunicação com o servidor
- [x] Criar tabela de resultados
- [x] Adicionar identificador ao resultado
- [x] Alterar o canvas dinamicamente
- [x] Retornar o IP do usuário mesmo que não cadastrado

## 2020-06-17

- [x] Corrigir desvio do leitor de codigo de barras para o Ipad (Adicionado um canvas dedicado)
- [x] Buscar o nome do modelo do classificador
- [x] Adicionar nome do modelo na instancia

## 2020-06-09

- [-] Add a button to revoke/claim last sent result
- [-] Home Screen
- [-] Create a return arrow button
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
