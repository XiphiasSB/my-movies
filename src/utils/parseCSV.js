import Papa from "papaparse"

const CSV_PATH = "./MyMoviesDB.csv"

function porcessMovies(results) {
    return results.data
        .filter((row) => row["Title Type"] === "Movie") // Keep only movies
        .map((row) => ({
            title: row.Title || "Unknown Title",
            rating: row["Your Rating"] || "N/A",
            directors: row.Directors || "Unknown Director",
            url: row.URL || "#",
            year: row.Year || "Unknown Year",
        }))
}

export async function getMovies() {
    const responce = await fetch(CSV_PATH)
    if (!responce.ok) {
        throw new Error(`Failed to fetch CSV file: ${responce.statusText}"`);
    }
    const csvText = await responce.text()

    return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const movies = porcessMovies(results)
                resolve(movies)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}