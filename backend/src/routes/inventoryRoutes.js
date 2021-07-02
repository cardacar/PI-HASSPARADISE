import {Router} from 'express'
import * as inventoryCtrl from '../controllers/inventoryController';
import {authJwt} from '../middleware'
const router = Router();

router.get('/', authJwt.verifyToken, inventoryCtrl.createInventory);

router.get('/',[authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.getAllInventory);
router.get('/:inventoryId', authJwt.verifyToken, inventoryCtrl.getInventoryById);

router.put('/:inventoryId', authJwt.verifyToken, inventoryCtrl.updateInventoryById);

router.delete('/:inventoyId', authJwt.verifyToken, inventoryCtrl.deleteInventoryById);


export default router;