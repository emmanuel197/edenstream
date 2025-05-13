import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchChannelEPGInfo } from "../../../redux/channels";
import Slider from "react-slick";
import sliderSettings from "../../../../utils/sliderConfig/sliderSettings";
import MovieCard from "../../cards/MovieCard";
import SliderWrapper from "../../SliderWrapper";

const LiveTvReelSlider = () => {
    const { channelCategories } = useSelector((state) => state.fetchMovies)
    const [EPGs, setEPGs] = useState([])

    useEffect(() => {
        const getAllChanelsIDs = () => {
            const channelIDs = []

            for (let i = 0; i < channelCategories.length; i++) {
                const element = channelCategories[i];
                let channels = element.channels

                for (let j = 0; j < channels.length; j++) {
                    channelIDs.push(channels[j].id)
                }
            }

            initFetchChannelEPGInfo(channelIDs.toString())
        }

        const initFetchChannelEPGInfo = async (channelIDs) => {
            setEPGs(await fetchChannelEPGInfo(channelIDs))
        }

        getAllChanelsIDs()
    }, [channelCategories])
    // console.log(channelCategories)
    return (
        <div>
            {
                channelCategories.map((channel, index) => {
                    return (
                        <div key={channel.id + index}>
                            <SliderWrapper title={channel.name}>
                                <Slider {...sliderSettings(5)}>
                                    {
                                        EPGs ? channel.channels.map((movieItem, index) => {

                                            const _movie = { ...movieItem }
                                            
                                            const _epg = EPGs.filter(epg => {
                                               
                                                return movieItem.id === epg.id
                                            })

                                            if (_epg.length > 0) {
                                                _movie.shows = _epg[0].shows
                                                
                                            } 
                                            
                                            return  <MovieCard key={movieItem.id + index} type='livetv' movie={_movie} />
                                        }) : <></>
                                    }
                                </Slider>
                            </SliderWrapper>
                            <br />
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LiveTvReelSlider
