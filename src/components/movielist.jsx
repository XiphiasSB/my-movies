import React, { useEffect, useState } from "react"

import "./MovieList.css"
import { MovieCard } from "./moviecard/moviecard.jsx"

import { Pagination } from "./pagination/pagination.jsx";


export function MovieList({filteredMovies, maxCardsPerPage, currentPage, handlePageChange, visibleMovies}) {
	const Movies = visibleMovies.map((movie, index) => (
		<MovieCard
			key={index}
			title={movie.title}
			rating={movie.rating}
			url={movie.url}
			directors={movie.directors}
			year={movie.year}
		/>
	))
	
	return (
		<div className="movie-list">
			<div className="movie-grid">
				{Movies}
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
