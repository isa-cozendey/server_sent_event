const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/metrics', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    console.log('Cliente conectado ao monitor de métricas.');

    const sendMetrics = () => {
        const metrics = {
            cpu: (Math.random() * 100).toFixed(2),
            memory: (50 + Math.random() * 30).toFixed(2),
            timestamp: new Date().toLocaleTimeString()
        };

        res.write(`data: ${JSON.stringify(metrics)}\n\n`);
    };

    const intervalId = setInterval(sendMetrics, 1500);

    req.on('close', () => {
        clearInterval(intervalId);
        console.log('Cliente desconectado.');
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});