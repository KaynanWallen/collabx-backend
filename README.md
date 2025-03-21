# Collbax - Backend

Collbax é um rede social para gestão e colaboração em projetos. O backend da aplicação foi desenvolvido para oferecer um serviço seguro, escalável e eficiente para todas as funcionalidades do sistema.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework Node.js para aplicações escaláveis
- **Prisma** - ORM para manipulação da base de dados
- **PostgreSQL** - Banco de dados relacional
- **Redis & BullMQ** - Gerenciamento de filas e tarefas assíncronas
- **Cloudflare R2** - Armazenamento de arquivos
- **JWT** - Autenticação segura
- **Postman/Insomnia** - Documentação das APIs

## ✅ Checklist de Funcionalidades (Backend)

| Módulo                | Funcionalidade                    | Status |
|-----------------------|--------------------------------|--------|
| **Accounts**         | CRUD                           | ✔      |
|                     | Segurança extra                | ⏳     |
| **Auth**            | Login                          | ✔      |
|                     | Autenticação JWT               | ✔      |
|                     | Dupla verificação             | ✔      |
| **Comments**        | CRUD                           | ✔      |
|                     | Reações                        | ✔      |
| **Comments-Reactions** | CRUD                        | ✔      |
| **Images**          | Upload para Cloudflare        | ✔      |
|                     | Limite de balanceamento       | ⏳     |
| **Database**        | Conectividade com Prisma      | ✔      |
| **Me**              | Recuperação de dados via token | ✔      |
| **Profiles**        | CRUD                           | ✔      |
|                     | Recomendação de perfis        | ⏳     |
| **Projects**        | CRUD                           | ✔      |
|                     | Recomendação de projetos      | ⏳     |
| **Projects-Reactions** | CRUD                        | ✔      |
| **R2-Bucket**       | Conectividade com Cloudflare  | ✔      |

✔ - Concluído | 💻 - Em desenvolvimento | ⏳ - Planejado

## 📄 Documentação de Rotas

A documentação completa das rotas pode ser acessada no Postman:
[Link para a documentação](https://www.postman.com/) (Desenvolvimento)

## 📌 Como Contribuir

Se deseja contribuir para o desenvolvimento do Collbax, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## ✒️ Autor

Desenvolvido por **[Kaynan Wallen](https://github.com/KaynanWallen)**

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](https://github.com/KaynanWallen/collabx-backend/blob/master/LICENSE) para mais detalhes.

---

Este README será atualizado conforme o progresso do desenvolvimento do Collbax. 🚀