import { Router } from 'express';
import {tweet_routes} from '../Controllers';
import validate from '../Middleware/validate';
import * as yup from 'yup';

let router = Router();

router.get(
    '/tweets',
    validate({
        shape: {
            from: yup.string().typeError('You must insert a valid number.').optional()
        },
        path: 'query',
        isAuthEndpoint: false
    }),
    tweet_routes.get_tweets,
);
router.get(
    '/tweet',
    validate({
        shape: {
            target: yup.string().typeError('You must insert a valid target.').required(),
            from: yup.string().typeError('You must insert a valid number.').optional()
        },
        path: 'query',
        isAuthEndpoint: false
    }),
    tweet_routes.get_tweet_by_target,
);
router.get(
    '/all_tweets',
    tweet_routes.get_all_tweets,
);
router.get(
    '/targets',
    tweet_routes.get_targets,
);

export default router;
