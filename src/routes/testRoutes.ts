/**
 * testRoutes.ts
 */
import { Router } from 'express';

import testController from '../controllers/testController.js';
import { TestDto } from '../dto/TestDto.js';
import { validateReqeust } from '../middlewares/validateReqeust.js';

const PREFIX_PATH = '/test';
const router = Router();

/**
 * @swagger
 * /test:
 *   post:
 *     summary: create data
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestData'
 *     responses:
 *       200:
 *         description: success
 */
router.post('/', validateReqeust(TestDto), testController.create.bind(testController));

/**
 * @swagger
 * /test/{id}:
 *   get:
 *     summary: read data
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: data ID
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: no data
 */
router.get('/:id', testController.read.bind(testController));

/**
 * @swagger
 * /test:
 *   get:
 *     summary: read data
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: no data
 */
router.get('/', testController.readAll.bind(testController));

/**
 * @swagger
 * /test/{id}:
 *   put:
 *     summary: update data
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestData'
 *     responses:
 *       200:
 *         description: success
 */
router.put('/:id', testController.update.bind(testController));

/**
 * @swagger
 * /test/{id}:
 *   delete:
 *     summary: remove data
 *     tags: [Test]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: data ID
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: no data
 */
router.delete('/:id', testController.remove.bind(testController));

const testRoutes = {
  PREFIX_PATH,
  router,
};

export default testRoutes;
