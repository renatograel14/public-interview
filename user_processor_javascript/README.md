# Desafio de Debugging - Processador de Dados de Usuários

Este é um desafio de debugging para desenvolvedores júnior e pleno. O objetivo é identificar e corrigir bugs em um sistema de processamento de dados de usuários.

## 📋 Descrição do Problema

O sistema `UserDataProcessor` foi desenvolvido para processar dados de usuários a partir de arquivos de texto, mas contém vários bugs que precisam ser corrigidos. O sistema deve:

1. Carregar dados de usuários de arquivos `.txt` no diretório `input/`
2. Validar os dados de cada usuário
3. Calcular estatísticas dos usuários
4. Filtrar usuários ativos
5. Exportar dados para CSV
6. Processar todos os usuários e retornar resultados

## 🐛 Desafio de Debugging

O código contém **bugs intencionais** que precisam ser identificados e corrigidos, depois, proponha melhorias para a solução.

## 📁 Estrutura dos Arquivos

```
input/
├── test_1.txt          # Usuário válido
├── test_2.txt          # Usuário válido
├── test_3.txt          # Usuário válido
├── test_4.txt          # Usuário com vírgula no nome (testa CSV)
├── test_5.txt          # Usuário válido
├── test_6.txt          # Usuário válido
├── invalid_email.txt   # Usuário com email inválido
├── invalid_age.txt     # Usuário com idade inválida
└── incomplete_data.txt # Dados incompletos
```

### Formato dos Arquivos de Entrada

Cada arquivo `.txt` deve conter 5 linhas:

```
ID (número)
Nome (string)
Email (string)
Idade (número)
Ativo (true/false)
```

Exemplo:

```
1
João Silva
joao.silva@email.com
25
true
```

### ⚠️ Importante: Não Alterar os Assertions

**Os testes já estão corretos e cobrem toda a funcionalidade esperada do sistema.**

- **NÃO altere** os assertions (expect) dos testes
- **NÃO modifique** a estrutura ou lógica dos testes
- Os testes definem o comportamento correto que o código deve implementar
- Se um teste está falhando, o problema está no código de produção, não no teste
- Os assertions foram cuidadosamente escritos para validar a funcionalidade completa

### 🧪 Comandos de Teste

#### Instalação e Configuração

```bash
# Instalar todas as dependências do projeto
npm install

# Verificar se as dependências foram instaladas corretamente
npm list
```

#### Execução de Testes

```bash
# Executar todos os testes do projeto
npm test

# Executar apenas um teste específico
npm run test:only [NUMERO_TESTE]

# Exemplo: executar apenas o teste 3
npm run test:only 3
```

#### Debugging e Desenvolvimento

```bash
# Executar testes em modo debug (permite usar debugger no código)
npm run test:debug

# Executar um teste específico em modo debug
npm run test:debug:only [NUMERO_TESTE]

# Executar o programa principal (fora do contexto de testes)
npm start
```

#### Dicas de Uso

- **Para debugging**: Use `npm run test:debug` para a IDE conseguir dar attach no processo
- **Para testar correções**: Execute `npm test` após cada mudança para verificar se os bugs foram corrigidos
- **Para testes específicos**: Use `npm run test:only` quando quiser focar em um teste específico
- **Para desenvolvimento**: Use `npm start` para testar o programa fora do contexto de testes

## 🚀 Setup

1. **Instalar Node.js**:

   - Mac: `brew install node`
   - Outros: https://nodejs.org/en/download/

2. **Instalar dependências**:

   ```bash
   npm install
   ```

3. **Executar testes**:
   ```bash
   npm test
   ```

## 🎯 **Objetivos**

1. **Leia os testes primeiro** - eles mostram o comportamento esperado
2. **Entenda o que a solução faz** - é importante saber e entender o objetivo da solução
3. **Os testes devem passar** - corrija os bugs de forma sustentável garantindo que outros testes não quebrem novamente
4. **Use o depurador do IDE** - coloque breakpoints e inspecione variáveis demonstre conhecimento utilizando sua IDE
5. **Proponha melhorias** - seguindo as diretrizes abaixo

- Uma soluçao mais consistente
- Garantir escalabilidade na importação de arquivos
- Código mais limpo para manutenção

## 🔧 Versões Testadas

- Node.js: v12.6.0+
- npm: v6.13.2+

---

**Boa sorte! 🍀**
