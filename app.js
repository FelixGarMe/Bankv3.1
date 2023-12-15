const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('layout', { view: 'home' });
});


app.get('/ingresos', (req, res) => {
    res.render('layout', { view: 'ingresos' });
});
// Ruta para mostrar la información de la API en divisa.ejs
app.get('/divisa', async (req, res) => {
    try {
        const apiUrl = process.env.FRANKFURTER_API_URL || 'https://api.frankfurter.app/latest';
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.render('layout', { view: 'divisa', rates: data.rates });
    } catch (error) {
        console.error('Error fetching data from Frankfurter API:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
