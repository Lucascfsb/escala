import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { uploadConfig } from "../config/upload";

export enum Role {
  Admin = "admin",
  usuário = "usuário",
  consulta = "consulta",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case "disk":
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case "s3":
        if (uploadConfig.config.aws) {
          return `https://${uploadConfig.config.aws.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${this.avatar}`;
        }
        return null;
      default:
        return null;
    }
  }
}
