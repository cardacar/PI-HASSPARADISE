import {Router} from 'express'
import * as precipitationCtrl from '../controllers/precipitationController';

const router = Router();

router.get('/', precipitationCtrl.getPrecipitation);

export default router;