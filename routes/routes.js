const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const multiMiddleWare = require('../middlewares/multerMiddleware')
const bookController = require('../controllers/bookController')
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware')

// to set up routes outside express server, create object for router class in express
const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google
router.post('/google-login',userController.googleController)

// edit
router.put('/user/edit/:id',authMiddleware,multiMiddleWare.single('picture'),userController.userEditController)

// bookupload
router.post('/add-book',authMiddleware,multiMiddleWare.array('uploadImages',3),bookController.addBookController)


router.get('/homebooks',bookController.getHomePageBookController)

router.get('/all-books',authMiddleware,bookController.getBooksPageBookController)

router.get('/user-books',authMiddleware,bookController.getUserBookBookController)

router.get('/bought-books',authMiddleware,bookController.getUserBoughtBookBookController)

router.get('/single-book/:id',authMiddleware,bookController.getSingleBookController)

router.delete('/remove-book/:id',authMiddleware,bookController.removeBookController)

router.get('/make-payment/:id',authMiddleware,bookController.bookpaymentController)

router.post('/verify-payment',bookController.verifyPaymentController)

router.post('/books-ai',authMiddleware,bookController.generateBookAbstractController)

// -----------------------------ADMIN---------------------------
router.get('/books',adminAuthMiddleware,bookController.getAllBooksController)

// admin edit
router.put('/admin/edit/:id',adminAuthMiddleware,userController.adminEditController)

// approve book
router.put('/book-approve/:id',adminAuthMiddleware,bookController.approveBooksController)

// all users
router.get('/all-users',adminAuthMiddleware,userController.getAllUsersController)


module.exports = router