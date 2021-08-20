import { Router } from 'express';
import tweet_routes from "./tweet.routes";

const router = Router();

router.use(tweet_routes)

export default router;
