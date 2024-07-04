# 🚀 <> Desafio Básico Frontend Aumo.ai </>

## 🧠 Sobre

O desafio consiste em implementar uma aplicação web client-side, que rode de forma consistente nos navegadores mais recentes e que seja responsiva para melhor visualização tanto em desktop como em dispositivos móveis.

# ✔️ Regras

Baseado no [Layout](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about.jpg), desenvolva uma página web que exibe informações de usuários.

## Premissas:
1. Ao carregar a página, as informações exibidas devem ser as suas próprias informações pessoais.
2. Ao clicar no botão 'try the next one', a página deve chamar uma API (disponível no link abaixo) que retorna dados de usuários randômicos e exibi-los na tela.
3. Ao clicar no botão 'Follow' a página deve armazenar essa informação. Caso o mesmo usuário seja exibido novamente o botão deve aparecer como 'Following' e com cor diferente
4. Ao seguir um usuário, deverá ser exibido um link na parte superior direita da página ([Layout](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_following.jpg))
5. Ao clicar no link, uma lista com os usuários seguidos deve ser exibida ([Layout](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_followers-list.jpg))
6. Ao navegar entre os usuários (via 'try the next one'), os usuários que NÃO forem seguidos devem aparecer na lista de sugestões ([Exemplo com 1](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_sugestions-list-1.png)) ([Exemplo com vários](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_sugestions-list-5.png)). Guarde essas informações no Browser, para que quando a página for acessada novamente ou recarregada, já exista sugestões iniciais.

 Note que o Layout e as premissas não deixam claro todas as situações possíveis para os dados do usuário.
 Você pode interpretar como quiser o que não foi definido como premissa e melhorar a funcionalidade da página, caso ache necessário.
 
## 📋 Recomendações:
- Utilize a versão mais recente do NextJs com Typescript (https://nextjs.org/)
- Utilize a versão mais recente do Tailwind CSS (https://tailwindcss.com/)
- Atente-se a responsividade da tela, tanto mobile como desktop (WEB)
- Por favor, inclua no README as instruções de instalação do projeto
- Sinta-se livre para incluir quaisquer observações ou melhorias
- Você pode utilizar qualquer pacote de componentes, templates, etc, se achar necessário, desde que sejam Opensource com licença MIT ou equivalente
- O layout nas imagens é um exemplo, não esperamos que o seu seja exatamente igual, use os recursos dos componentes que escolher para montar a interface

## 😎 Seria legal
- Fazer deploy na vercel, netlify ou em outro local de sua preferência e disponibilizar um link de visualização

## Links
[Layout 1](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about.jpg)
[Layout 2](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_following.jpg)
[Layout 3](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_followers-list.jpg)
[Layout 4](https://github.com/aumoai/challenge-front-basico/blob/main/files/layout-about_sugestions-list-5.png)

Link da [API](https://randomuser.me/api/).

⚠️ a Api pode demorar pra responder ou ficar fora do ar em alguns momentos (pense nisso quando for desenvolver).

## ...

Preparado?
Crie um fork desse repositório, quando finalizar, envie o link para o seu contato na Aumo.ai ;)

Caso tenha dúvidas, envie uma mensagem para o seu contato.

## Boa sorte!
Nossa análise vai além do resultado final então se você tiver um problema implementando algum detalhe nos envie a sua solução mesmo assim.


