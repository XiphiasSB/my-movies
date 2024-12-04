import "./search.css"

export function Search({ searchQuery, handleSearch }) {
	return (
		<div className="search-bar">
			<label htmlFor="search">Search: </label>
			<input
				id="search"
				type="text"
				value={searchQuery}
				onChange={handleSearch}
				placeholder="Search by title, rating, or director"
			/>
		</div>
	)
}
