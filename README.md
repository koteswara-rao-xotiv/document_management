
## Description

NestJS Backend (User Management and Document Management)

## Folder Structure
```bash

src/
├── auth/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
├── common/
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   ├── enums/
│   │   ├── role.enum.ts
│   │   ├── verification-status.enum.ts
│   ├── guards/
│   │   ├── roles.guard.ts
├── document/
│   ├── dto/
│   │   ├── create-document.dto.ts
│   │   ├── update-document.dto.ts
│   ├── document.controller.ts
│   ├── document.entity.ts
│   ├── document.module.ts
│   ├── document.service.ts
├── ingestion/
│   ├── ingestion.controller.ts
│   ├── ingestion.module.ts
├── role/
│   ├── dto/
│   │   ├── create-role.dto.ts
│   │   ├── update-role.dto.ts
│   ├── role.controller.ts
│   ├── role.entity.ts
│   ├── role.module.ts
│   ├── role.service.ts
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   ├── user.controller.ts
│   ├── user.entity.ts
│   ├── user.module.ts
│   ├── user.service.ts
├── main.ts
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
