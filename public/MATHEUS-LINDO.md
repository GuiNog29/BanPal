
Feedbacks

**Pontos a melhorar**
1. Configuração de ambiente: Mesmo utilizando o Docker o único container criado era o de database. O container para a aplicação em si (node) não existe;
2. Testes: Sem testes você não consegue ter o seus domínios sólidos e bem estruturados. Não da pra garantir que a sua aplicação realmente funciona;
3. Falta de boas-práticas: A sua aplicação (src/Presentation/Account/AccountController.ts) por exemplo fera muitas regras do S.O.L.I.D, dentre elas, Single Responsability! A classe AccountController.ts realiza tantas tarefas e possui um acoplamento muito forte. Uma das regras do DDD é deixar a regra de negócio dentro do seu devido domínio. A aplicação não possui os domínios devidamente separados então uma mesma classe acaba tendo diversos papéis, como: receber a request, fazer operações no banco, validar a regra de negócio, ser a PRÓPRIA estrutura do banco.

**Pontos legais**
1. As rotas foram criadas de forma separada, isso ajuda muito quando o sistema escalar e deixa a casa meio que “organizada”;
2. Swagger;
3. O objetivo foi concluído.

**Por onde começar a melhorar melhorar**
1. Deixar os domínios separados e bem definidos (Controllers (tratar requisições e distribuir funções), Conexões com o banco, Domínio (User, Account) e suas regras de negócio);
2. Criar testes unitários (de preferência usando TDD);
3. Ter abstrações para as pesquisas realizadas no banco (Frameworks são legais, mas quando temos queries espalhadas pelo código acaba mais complicando do que ajudando);

Pra ajudar acabei melhorando os teus containers! :D
