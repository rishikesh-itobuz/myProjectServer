import express from 'express';
const router = express.Router();
import { userSignUp ,userLogin} from '../controllers/userDetails.js';

router.route('/sign-up').post(userSignUp);
router.route('/login').post(userLogin);





export default router;