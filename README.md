# Form Veículos

Indico rodar os códigos via terminal Git Bash - https://git-scm.com/downloads

Projeto rodando em modo strict padrão (true)

## Manual para rodar projeto

### Baixar Angular CLI - (terminal)

```
npm install -g @angular/cli
```

### Baixar biblioteca ngx-mask - (terminal)

    npm i ngx-mask

#### Em caso de erro: Configurações no módulo (ngx-mask)

##### NgModule Imports

```
NgxMaskModule.forRoot()
```

##### Imports

```
import { NgxMaskModule } from 'ngx-mask';
```

### Baixar biblioteca ngx-bootstrap - (terminal) - via Angular CLI

```
ng add ngx-bootstrap
```

### Baixar biblioteca ngx-bootstrap - (terminal) - Manualmente

```
npm install ngx-bootstrap --save
```

#### Em caso de erro: Configurações no módulo (ngx-bootstrap)

#### Configurações no módulo (ngx-bootstrap)

##### NgModule Imports

```
ModalModule.forRoot()
```

##### Imports

```
import { ModalModule } from 'ngx-bootstrap/modal';
```

### Servidor REST local

#### Instalar serviço

```
npm install -g json-server
```

#### Rodar servidor

```
json-server --watch db.json
```

Caso deseje criar seu próprio servidor

```
npm i json-server
```

Assim será criado um server db.json com valor padrão definido pela biblioteca

#### Estrutura padrão do servidor de veículos

```
{
  "veiculos": [
    {
      "id": 1,
      "placa": "LDR4678",
      "chassi": "12344dfdf",
      "renavam": "948938383",
      "marca": "Dodge",
      "modelo": "Dodge Model",
      "ano": "2014"
    },
    {
      "id": 2,
      "placa": "LOT4678",
      "chassi": "56465656565",
      "renavam": "999999999",
      "marca": "Rover",
      "modelo": "Rover Fast V8",
      "ano": "2006"
    }
  ]
}
```

## Versões

#### Node.js

`v16.17.0`

#### npm

`8.15.0`

#### ngx-bootstrap

`^9.0.0`

#### ngx-mask

`^14.2.3`

#### Angular CLI

```
@angular-devkit/architect       0.1402.3
@angular-devkit/build-angular   14.2.3
@angular-devkit/core            14.2.3
@angular-devkit/schematics      14.2.3
@schematics/angular             14.2.3
rxjs                            7.5.7
typescript                      4.7.4
```

### Detalhes

Servidor rodando localmente, então o acesso ao github pages não terá todas as funcionalidades do projeto local

Delay no carregamento da lista de veículos cadastrados simulado manualmente
