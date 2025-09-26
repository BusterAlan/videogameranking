import Joi from 'joi';

export const playerSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required().min(2).max(50)
});

export const scoreSchema = Joi.object({
  playerId: Joi.string().required(),
  score: Joi.number().integer().min(0).required()
});