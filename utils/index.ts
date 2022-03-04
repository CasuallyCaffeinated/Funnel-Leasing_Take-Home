import app from '../app';

const PORT = 8081;

app.listen(PORT, () => {
	console.log(`App started on port ${PORT}, http://localhost:${PORT}`);
});
