const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /health-check:
 *  get:
 *     tags:
 *      - HealthCheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get(`/health-check`, (req, res) => res.sendStatus(200));

module.exports = router;
