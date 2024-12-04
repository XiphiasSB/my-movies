import "./sort.css"

export function SortBy({ sortBy, handleSort }) {
	return (
		<div className="sorting-controls">
			<label htmlFor="sort">Sort by: </label>
			<select id="sort" value={sortBy} onChange={handleSort}>
				<option value="titleAZ">Title A-Z</option>
				<option value="titleZA">Title Z-A</option>
				<option value="ratingA">Rating Low-High</option>
				<option value="ratingD">Rating High-Low</option>
			</select>
		</div>
	)
}
