import { object } from 'yup';

const validate = ({shape, path = 'body', isAuthEndpoint = false}) => async (req, res, next) => {
    const schema = object().shape(shape);
    try {
        const validData = await schema.validate(req[path]);
        req.validData = validData;
        return next();
    } catch (error) {
        return next({errors: error.errors, name: isAuthEndpoint ? 'UnauthorizedError' : 'ValidationError'});
    }
};

export default validate;
