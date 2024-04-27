import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [materials, setMaterials] = useState<any[]>([]);

	useEffect(() => {
		const fetchMaterials = async () => {
			const response = await fetch("http://localhost:5000/api/", {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error("Failed to fetch materials");
			}

			const materials = await response.json();
			setMaterials(materials);
		};

		fetchMaterials();
	}, []);

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			{materials &&
				materials.map((material: any) => (
					<div key={material.id}>{material.name}</div>
				))}
		</>
	);
}

export default App;
