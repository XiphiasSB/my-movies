import React, { useEffect, useState } from "react"
import { getMovies } from "../utils/parseCSV"
import "./MovieList.css"
import { MovieCard } from "./moviecard/moviecard.jsx"
import { Search } from "./search/search.jsx"
import { SortBy } from "./sort/sort.jsx"
import { Headline } from "./title/title.jsx"
import { Pagination } from "./pagination/pagination.jsx";

export function MovieList() {
	const [movies, setMovies] = useState([])
	const [filteredMovies, setFilteredMovies] = useState([])
	const [visibleMovies, setVisibleMovies] = useState([])
	const [sortBy, setSortBy] = useState("titleAZ")
	const [searchQuery, setSearchQuery] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

	const maxCardsPerPage = 10

	const fetchMovies = async () => {
		try {
			const data = await getMovies()
			const sortedData = data.sort((a, b) => a.title.localeCompare(b.title))
			setMovies(sortedData)
			setFilteredMovies(sortedData)
			setVisibleMovies(sortedData.slice(0, maxCardsPerPage))
		} catch (error) {
			console.error("Error loading movies:", error)
		}
	}
	useEffect(() => {
		fetchMovies()
	}, [])

	const handleSort = (e) => {
		const sortKey = e.target.value
		setSortBy(sortKey)

		// Make a shallow copy of filteredMovies.
		const sortedMovies = [...filteredMovies].sort((a,b) => {
			switch (sortKey) {
				case "titleAZ":
					return a.title.localeCompare(b.title) // Sort alphabetically A-Z
				case "titleZA":
					return b.title.localeCompare(a.title) // Sort alphabetically Z-A
				case "ratingA":
					return a.rating - b.rating // Sort by rating low-high
				case "ratingD":
					return b.rating - a.rating // Sort by rating high-low

				default:
					return 0
			}
		})
		setFilteredMovies(sortedMovies)
		setVisibleMovies(sortedMovies.slice(0, maxCardsPerPage))
	}

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase()
		setSearchQuery(query)

		const filtered = movies.filter(
			(movie) =>
				movie.title.toLowerCase().includes(query) ||
				movie.rating.toString().includes(query) ||
				(movie.directors && movie.directors.toLowerCase().includes(query)) ||
				movie.year.toString().includes(query)
		)

		const sortedFiltered = filtered.sort((a, b) => {
			switch (sortBy) {
				case "titleAZ":
					return a.title.localeCompare(b.title);
				case "titleZA":
					return b.title.localeCompare(a.title);
				case "ratingA":
					return a.rating - b.rating;
				case "ratingD":
					return b.rating - a.rating;
				default:
					return 0;
			}
		});
		setCurrentPage(1)
		setFilteredMovies(filtered)
		setVisibleMovies(filtered.slice(0, maxCardsPerPage))
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
        const startIndex = (page - 1) * maxCardsPerPage;
        const endIndex = startIndex + maxCardsPerPage;
        setVisibleMovies(filteredMovies.slice(startIndex, endIndex));
    }

	return (
		<div className="movie-list">
			<Headline />
			<div className="sticky-container">
				<SortBy sortBy={sortBy} handleSort={handleSort} />
				<Search searchQuery={searchQuery} handleSearch={handleSearch}/>
			</div>
			<div className="movie-grid">
				{visibleMovies.map((movie, index) => (
					<MovieCard
						key={index}
						title={movie.title}
						rating={movie.rating}
						url={movie.url}
						directors={movie.directors}
						year={movie.year}
					/>
				))}
			</div>
			<Pagination
                totalCards={filteredMovies.length}
                maxCardsPerPage={maxCardsPerPage}
				currentPage={currentPage}
                onPageChange={handlePageChange}
            />
		</div>
	)
}
