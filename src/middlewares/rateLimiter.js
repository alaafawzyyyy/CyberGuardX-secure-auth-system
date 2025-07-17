import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: 'Too many requests, please try again after a minute.',
  standardHeaders: true, 
  legacyHeaders: false, 
});
