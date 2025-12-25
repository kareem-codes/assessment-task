import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermitsModule } from './permits/permits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PermitsModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
