import '../../../components/styles/noMovies.scss'

const NoMovies = ({ label }) => {
    return (
        <>
            <section className='no-movies'>
                <h2>{label}</h2>
            </section>
        </>
    )
}

export default NoMovies