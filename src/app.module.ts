import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { BlogFileRepository, BlogMongoRepository } from './blog/blog.repository';
import { Blog, BlogSchema } from './blog/blog.schema';


@Module({
  imports: [
    //MongoDB 연결 설정
    MongooseModule.forRoot(
      'mongodb+srv://bdkim855:zxcv1234@cluster0.oo1u5m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogFileRepository, BlogMongoRepository],
})
export class AppModule {}
