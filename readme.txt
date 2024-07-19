# DDD (Domain-Driven Design)

Design dirigido à domínio

- Design é como nos vamos desenhar nossa aplicação e desenhar não tem haver como implementar nossa aplicação, é apenas como vamos converter o problema do nosso cliente em um software que resolve o problema do nosso cliente

## Domínio

- O que é domínio : área de entendimento, uma área onde todas pessoas envolvidas na construção do software tem conhecimentos muito semelhantes.

Conceitos iniciais de domínio, ou etapas!

### Domain Experts (Pessoas que entendem a fundo o problema, que posteriormente iremos resolver com um software)
 - Consiste na etapa onde você como desenvolvedor(solo ou equipe no geral) vão conversar com experts sobre o problema, para entender melhor sobre o mesmo, e assim posteriormente conseguir dar uma solução que resolva o problema de forma satisfatória
    
  - Se pularmos essa etapa muito provavelmente não iremos entender a fundo o problema que nosso cliente enfrenta e como consequência disso, o nosso software não ira atender ou resolver da melhor forma o problema do cliente e vamos acabar deixando os insatisfeitos com a situação e dessa maneira ainda vamos nos queimar como empresa!

### Linguagem ubígua
 - Linguagem ubígua é basicamente nos como desenvolvedores o cliente e todos envolvidos no processo de criação, desde o momento 0, isso é todos mesmo, todo mundo que estiver na conversa para o desenvolvimento do software, precisa entender plenamente tudo o que está sendo falado, então não devemos usar tantos termos técnicos, devemos usar uma linguagem que todos na roda entendam, tanto o cliente deve falar sobre o problema de forma que nos entendemos e nos devemos falar sobre o como vai ser desenvolvido de forma que ele entendam

  - exemplo vamos supor que estamos fazendo um software pra uma barbearia, o barbeiro pode ter uma faxineira, pode ter o pessoal que vai pra cortar o cabelo e pode ter outros barbeiros que trabalham no estabelecimento, quando formos conversar com os experts, ele provavelmente irá citar faxineira,barbeiros e clientes, mas pra nos desenvolvedores, tanto quanto faxineira, como barbeiros e clientes, podem ser considerados como user e ter apenas algumas propriedades diferentes nas entidades, mas nao podemos falar isso na conversa, os experts muito provavelmente não irão entender.

  - Definição do google sobre linguagem ubígua : Linguagem Ubíqua: Este é um idioma compartilhado por todos os membros da equipe, tanto técnicos quanto não técnicos, alinhado com o domínio do negócio. A linguagem ubíqua é crucial para manter a consistência na comunicação e garantir um entendimento comum de todos os aspectos e processos em torno do produto.


### Entidades
- 



### Casos de uso
- 


### Como geralmente identificamos entidades e casos de uso

- Geralmente identificamos em uma conversa, exemplo "Muita dificuldade em saber as dúvidas dos alunos", "Eu tenho que responder as dúvidas dos alunos, e não sei quais dúvidas ja foram respondidas"
 - So nessa conversa ja conseguimos identificar 3 possiveis entidades, Instrutor, Estudante e Perguntas, e identificamos um caso de uso "Responder pergunta"