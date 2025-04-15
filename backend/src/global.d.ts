// src/global.d.ts
// src/global.d.ts
import "./types/express/express"; // Bu zaten varsa tamam

export interface UserPayload {
  id: string;
  _id?: string;
  role: "admin" | "user" | "customer" | "moderator" | "staff";
  email?: string;
  name?: string;
  isActive?: boolean;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      uploadType?: "profile" | "product" | "category" | "blog" | "gallery" | "service" | "library" | "references" | "news" | "default";
    }
  }

  interface IUserToken extends UserPayload {}
}
