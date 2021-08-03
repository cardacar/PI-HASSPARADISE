import {Router} from 'express'
import * as inventoryCtrl from '../controllers/inventoryController';
import {authJwt} from '../middleware'
const router = Router();

router.post('/',[authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.createInventory);

router.get('/',[authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.getAllInventory);
router.get('/:inventoryId', [authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.getInventoryById);

router.put('/:inventoryId', [authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.updateInventoryById);

router.delete('/:inventoryId', [authJwt.verifyToken, authJwt.isAdmin], inventoryCtrl.deleteInventoryById);


export default router;