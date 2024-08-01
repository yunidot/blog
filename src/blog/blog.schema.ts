import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
    @Prop()
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    name: string;

    @Prop({required:true})
    createdDt: Date;

    @Prop({required: false})
    updatedDt: Date;
}
// 스키마 생성
export const BlogSchema = SchemaFactory.createForClass(Blog);