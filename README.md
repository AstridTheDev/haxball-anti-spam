# Anti-Spam

Script contra flood & spam para HaxBall, feito totalmente em JavaScript
Versão Atual: 1.1.0v

O código identifica:

- mensagens iguais enviadas repetidamente (spam)
- muitas mensagens em um curto tempo

Quando um dos limites é atingido, o jogador é mutado

# Sumário

- [Como usar](#como-usar) Tutorial de como usar o código
- [Configuração](#configuração) Configurações personalizáveis 
- [Licença](#licença) **Licença** para usar o codigo

# Como usar

Modifique e integre esse template no código da sua sala 
Não cole ele sem modificações no seu código, a versão original cria uma nova sala, modifique e tire essa parte

## Caso não tiver uma sala

- Entre no [Haxball Headless](https://www.haxball.com/headless)
- Aperte F12 (DevTools) vá em Console
- Cole o codigo
- Aperte enter
- Faça o Captcha do Headless

## Configuração

As configurações ficam no início do código:

```js
const maxSpam = 5;
const maxMessages = 7;
const spamWindow = 5000;
const muteTime = 10;
```

### `maxSpam`

Define o limite de mensagens seguidas

Exemplo:

```js
const maxSpam = 5;
```

Se o jogador enviar a mesma mensagem 5 vezes seguidas, ele será mutado.

```text
oi
oi
oi
oi
oi ← mute
```

---

### `maxMessages`

Define quantas mensagens podem ser enviadas dentro do tempo definido em `spamWindow`.

Exemplo:

```js
const maxMessages = 7;
```

Se o jogador enviar 7 mensagens dentro do cooldown configurado, ele será mutado.

---

### `spamWindow`

Define o cooldown (o intervalo que o jogador pode mandar mensagem)
Valor em milissegundos

Exemplo:

```js
const spamWindow = 5000;
```

`5000 ms` = `5 segundos`.

Com:

```js
const maxMessages = 7;
const spamWindow = 5000;
```

o jogador será mutado caso envie 7 mensagens em até 5 segundos.

---

### `muteTime`

Define por quantos segundos o jogador ficará mutado.

Exemplo:

```js
const muteTime = 10;
```

Nesse caso, o jogador ficará mutado por 10 segundos.

## Exemplo de configuração

```js
const maxSpam = 5;
const maxMessages = 7;
const spamWindow = 5000;
const muteTime = 10;
```

Essa configuração aplica mute quando o jogador:

- envia 5 mensagens iguais seguidas; ou
- envia 7 mensagens em até 5 segundos.

O mute dura 10 segundos.

## Linguagem de programação

- JavaScript

## Licença

Esse projeto é distribuído sob a licença MIT.

Você pode usar, modificar e distribuir o código livremente, desde que os termos da licença sejam respeitados.

Veja o arquivo `LICENSE` para mais informações.
