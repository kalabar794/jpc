import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Import API handlers
import getCompetitors from './api/get-competitors.js';
import analyzePagespeed from './api/analyze-pagespeed.js';
import analyzeContent from './api/analyze-content.js';
import analyzeSecurity from './api/analyze-security.js';
import runFullAnalysis from './api/run-full-analysis.js';
import analyzeCompetitor from './api/analyze-competitor.js';
import saveCompetitor from './api/save-competitor.js';
import importExcel from './api/import-excel.js';

// API routes
app.get('/api/get-competitors', (req, res) => getCompetitors(req, res));
app.post('/api/analyze-pagespeed', (req, res) => analyzePagespeed(req, res));
app.post('/api/analyze-content', (req, res) => analyzeContent(req, res));
app.post('/api/analyze-security', (req, res) => analyzeSecurity(req, res));
app.post('/api/run-full-analysis', (req, res) => runFullAnalysis(req, res));
app.post('/api/analyze-competitor', (req, res) => analyzeCompetitor(req, res));
app.post('/api/save-competitor', (req, res) => saveCompetitor(req, res));
app.post('/api/import-excel', (req, res) => importExcel(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Open http://localhost:3000 to view the dashboard');
});