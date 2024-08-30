import * as catsApplication from '../applications/catsApplication';

const router = createRouter()

router.get('/cats', defineEventHandler(catsApplication.getAllCats))
router.get('/cats/:id', defineEventHandler(catsApplication.getCatById))
router.post('/cats', defineEventHandler(catsApplication.createCat))
router.put('/cats/:id', defineEventHandler(catsApplication.editCat))
router.delete('/cats/:id', defineEventHandler(catsApplication.deleteCat))


export default useBase('/api/v1', router.handler);