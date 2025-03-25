import { useCallback, useState } from 'react'
import './App.css'

const baseApiEndPoint = `${import.meta.env.VITE_API_BASE_URL}`;

function App() {
	const [sum, setSum] = useState("???")
	const [a, setA] = useState(0);
	const [b, setB] = useState(0);

	const handleChangeA = useCallback(e => {
		const valA = e.target.value;

		setA(parseInt(valA, 10));
	}, [setA]);

	const handleChangeB = useCallback(e => {
		const valB = e.target.value;

		setB(parseInt(valB, 10));
	}, [setB]);

	const submit = useCallback(() => {
		console.log(`${a} + ${b}`);

		fetch(`${baseApiEndPoint}/sum`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ a, b })
		}).then((res) => {
			return res.json();
		}).then(json => {
			const sum = json.result;

			setSum(sum);
		});

	}, [a, b, setSum]);

	return (
		<>
			<div>
				<h1>Cool Sum</h1>
				<input type="number" onChange={handleChangeA} defaultValue={a} />
				<label>+</label>
				<input type="number" onChange={handleChangeB} defaultValue={b} />
				<label>=</label>
				{sum}
			</div>
			<div>
				<button type="button" onClick={submit}>Solve</button>
			</div>
		</>
	)
}

export default App
