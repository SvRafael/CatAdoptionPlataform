import * as catsApplication from '../applications/catsApplication';
import * as adoptApplication from '../applications/adoptApplication';
import * as loginApplication from '../applications/loginApplication';

const router = createRouter()

router.get('/cats', defineEventHandler(catsApplication.getAllCats))
router.get('/cats/:id', defineEventHandler(catsApplication.getCatById))
router.post('/cats', defineEventHandler(catsApplication.createCat))
router.put('/cats/:id', defineEventHandler(catsApplication.editCat))
router.delete('/cats/:id', defineEventHandler(catsApplication.deleteCat))
router.post('/cats/adopt', defineEventHandler(adoptApplication.createAdoptApplication))
router.post('/login', defineEventHandler(loginApplication.login))


export default useBase('/api/v1', router.handler);