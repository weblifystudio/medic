declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: import("@shared/schema").UserResponse;
    }
  }
}

export {};