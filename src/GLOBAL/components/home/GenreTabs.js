import { useDispatch, useSelector } from 'react-redux'
import { genreTabs } from '../../constants/genres'
import { setActiveGenreTab } from '../../redux/slice/genreTabSlice'
import '../../components/styles/landing/genreTabs.scss'

const GenreTabs = () => {
    const dispatch = useDispatch()
    const { activeGenreTab } = useSelector(state => state.genreTab)
    const _setActiveGenreTab = (_genreTab = 'ALL') => {
        dispatch(setActiveGenreTab(_genreTab))
    }

    return (
        <>
            <section>
                <ul className="genre-tabs">
                    {
                        genreTabs.map((genreTab, i) => {
                            return <li className={activeGenreTab === genreTab ? 'active-genre-tab' : ''} key={i} onClick={() => _setActiveGenreTab(genreTab)}>{genreTab}</li>
                        })
                    }
                </ul>
            </section>
        </>
    )
}

export default GenreTabs