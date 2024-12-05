import "./moviecard.css"
import React, { useState, useEffect } from "react"
const apiKey = process.env.REACT_APP_OMDB_API_KEY || "default_fallback_key"

export function MovieCard({ title, year, rating, directors, url }) {
	const [poster, setPoster] = useState(null)

	useEffect(() => {
		async function fetchPoster() {
			try {
				const response = await fetch(
					`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${apiKey}`
				)
				const data = await response.json()
				if (data.Poster && data.Poster !== "N/A") {
					setPoster(data.Poster) // Set the poster if available
				} else {
					setPoster(null) // Handle cases where no poster is found
				}
			} catch (error) {
				console.error("Error fetching poster:", error)
				setPoster(null)
			}
		}
		fetchPoster()
	}, [title, year])

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="movie-card"
		>
			<h2 className="movie-title">
				{title} ({year})
			</h2>
			{poster ? (
				<img src={poster} alt={`${title} poster`} className="movie-poster" />
			) : (
				<p className="movie-no-poster">No Poster Available</p>
			)}
			<p className="movie-rating">Rating: {rating} / 10</p>
			<p className="movie-director">Directed by: {directors}</p>
		</a>
	)
}
