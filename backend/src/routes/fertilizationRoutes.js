import { Router } from 'express';
import * as fertilizationCtrl from '../controllers/fertilizationControllers.js'
import {userExtractor} from '../middleware/userExtractor.js';

const router = Router();

router.get('/', userExtractor ,fertilizationCtrl.getDataUserFertilization);

router.get('/admin', userExtractor ,fertilizationCtrl.getAllDataFertilization);

router.post('/', userExtractor, fertilizationCtrl.postFertilization);

router.delete('/:lote', userExtractor, fertilizationCtrl.deleteOneFertilization);

router.put('/:id', (req, res)=>{
    res.send('put fertilization')
});

export default router;
