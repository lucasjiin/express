// /**
//  * testRoutes.ts
//  */
// import { Router } from 'express';

// import testController from '../controllers/testController';
// import { TestDto } from '../dto/TestDto';
// import { validateReqeust } from '../middlewares/validateReqeust';
// import IAppRoutes from '../interfaces/IAppRoutes';

// const PREFIX_PATH = '/test';
// const router = Router();

// /**
//  * @swagger
//  * /test:
//  *   post:
//  *     summary: 테스트 데이터 생성
//  *     tags: [Test]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/TestData'
//  *     responses:
//  *       200:
//  *         description: 생성 성공
//  */
// router.post('/', validateReqeust(TestDto), testController.create.bind(testController));

// /**
//  * @swagger
//  * /test/{id}:
//  *   get:
//  *     summary: 테스트 데이터 조회
//  *     tags: [Test]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: 데이터 ID
//  *     responses:
//  *       200:
//  *         description: 데이터 반환
//  *       404:
//  *         description: 데이터 없음
//  */
// router.get('/:id', testController.read.bind(testController));

// /**
//  * @swagger
//  * /test/{id}:
//  *   put:
//  *     summary: 테스트 데이터 수정
//  *     tags: [Test]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: 데이터 ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/TestData'
//  *     responses:
//  *       200:
//  *         description: 수정 성공
//  */
// router.put('/:id', testController.update.bind(testController));

// /**
//  * @swagger
//  * /test/{id}:
//  *   delete:
//  *     summary: 테스트 데이터 삭제
//  *     tags: [Test]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *         description: 데이터 ID
//  *     responses:
//  *       200:
//  *         description: 삭제 성공
//  *       404:
//  *         description: 데이터 없음
//  */
// router.delete('/:id', testController.remove.bind(testController));

// const testRoutes: IAppRoutes = {
//   PREFIX_PATH,
//   router,
// };

// export default testRoutes;
