import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as session from "express-session";
import * as passport from "passport";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "x-SecreteCode_key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
  const config = new DocumentBuilder()
    .setTitle("Document Management API")
    .setDescription("API documentation for the Document Management system")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
  console.log("server listening on port", process.env.PORT ?? 3000);
}
bootstrap();
