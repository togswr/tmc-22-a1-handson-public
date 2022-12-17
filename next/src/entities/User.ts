/*
 * Types
 */

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  email_verified_at: Date | null;
};

export type ApiDataUser = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

/*
 * Converter
 */

export const UserConverter = {
  user(data: ApiDataUser): User {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      email_verified_at: data.email_verified_at
        ? new Date(data.email_verified_at)
        : null,
    };
  },
};
