# Como contribuir para o projecto

Este projecto é aberto e requer ajuda da comunidade para continuar activo. Qualquer contributo positivo é sempre bem-vindo.

## Correcção de conteúdo
Se o conteúdo não for exactamente o mesmo do programa do Governo, são aceites correcões nos documentos respectivos. Caso falte um ponto ou a transcrição não esteja correcta, qualquer contributo é bem-vindo.

O conteúdo está disponível em `promessas_data/<partido>/**/<id>.md`.

Basta abrir um pull-request com as alterações. O mesmo será avaliado e caso seja aceite passará a estar disponível online.

## Marcar promessa como cumprida

1. Identificar o documento respectivo da promessa (`promessas_data/<partido>/**/<id>.md`). No website podes encontrar um link directo para o documento.
2. Adicionar a data em que a promessa foi cumprida no campo `fulfilled_data`. Formato da data: `AAAA-MM-DD`
3. Abrir um pull request
4. Aguardar aprovação


## Divulgação

Espalha o site pelos teus contactos, redes sociais, etc. O importante é a população estar informada que existe uma forma simples e acessível de confirmar se determinadas propostas já foram cumpridas.

Usa a seguinte imagem para seguir em tempo real quantas promessas/propostas já foram cumpridas. Cola-a no teu website,

[![cumpridometro](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fandrepcg%2Fo-governo-ja-cumpriu%2Fraw%2Fmain%2Fcumpridometro.json&query=%24.text&label=Cumprid%C3%B3metro&color=blue)](https://ogovernojacumpriu.pt)

### HTML
```html
<a href="https://ogovernojacumpriu.pt?utm_campaign=cumpridometro"><img alt="O Governo Já Cumpriu?" src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fandrepcg%2Fo-governo-ja-cumpriu%2Fraw%2Fmain%2Fcumpridometro.json&query=%24.text&label=Cumprid%C3%B3metro&color=blue" /></a>
```

### Markdown

```markdown
[![cumpridometro](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgithub.com%2Fandrepcg%2Fo-governo-ja-cumpriu%2Fraw%2Fmain%2Fcumpridometro.json&query=%24.text&label=Cumprid%C3%B3metro&color=blue)](https://ogovernojacumpriu.pt?utm_campaign=cumpridometro)
```

