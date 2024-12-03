# Executando a SinapseAPI localmente
## Instalando compilador Rust
Instale o `rustup` no seu sistema para compilar o programa. Você pode encontrar as instruções de instalação especificas para seu ambiente em https://www.rust-lang.org/pt-BR/tools/install.

Para checar a instalação execute `rustup --version` na sua linha de comando, você deve ver algo como:
```bash
rustup 1.27.1 (54dd3d00f 2024-04-24)
info: This is the version for the rustup toolchain manager, not the rustc compiler.
info: The currently active `rustc` version is `rustc 1.82.0 (f6e511eec 2024-10-15)`
```
## Instalando e configurando MongoDB
Instale o MongoDB Community Server. Os executáveis estão disponíveis em https://www.mongodb.com/try/download/community.
> IMPORTANTE: durante a instalação certifique-se de marcar a caixa de instalação do MongoDB Compass.

Ao abrir o MongoDB Compass, crie um nova conexão, defina um nome qualquer e siga com as opções padrão.

![image](https://github.com/user-attachments/assets/bf39677d-90f2-4f08-bebe-61a47e80c3a1)

Dentro da nova conexão crie um banco de dados, defina o nome para SinapseDB, nomeie a coleção como `users` e siga com as opções.

![image](https://github.com/user-attachments/assets/8c115d5e-9c61-4ac4-ad33-bb598ec9fb44)

## Executando a aplicação
Acesse seu clone deste repositório e navegue para o diretório da API e execute os seguintes comandos no seu terminal:
```bash
cd sinapse_api
cargo run
```
Neste ponto a aplicação irá ser compilada e você deve ver a seguinte mensagem em sua linha de comando:
```bash
   Compiling sinapse_api v0.1.0 (C:\Dev\Faculdade\Web Development\SinapseFlashcards\sinapse_api)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 4.54s
     Running `target\debug\sinapse_api.exe`
Server running at http://127.0.0.1:8080
```
