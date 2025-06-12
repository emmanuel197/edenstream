import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchChannelEPGInfo } from "../../../redux/channels";
// Removed unused imports: Slider, sliderSettings, SliderWrapper
import MovieCard from "../../cards/MovieCard";
import { RwContentContainer } from "../../reels/ReelWrapper";
import "../../styles/reel-wrapper.scss";

const LiveTvReelSlider = () => {
    const { channelCategories } = useSelector((state) => state.fetchMovies)
    const [EPGs, setEPGs] = useState([])

    console.log("LiveTvReelSlider: channelCategories from Redux", channelCategories); // Log channelCategories from Redux

    useEffect(() => {
        const getAllChanelsIDs = () => {
            const channelIDs = []

            for (let i = 0; i < channelCategories.length; i++) {
                const element = channelCategories[i];
                 // Add check for valid element and channels array
                if (element && element.channels) {
                    let channels = element.channels

                    for (let j = 0; j < channels.length; j++) {
                         // Add check for valid channel object
                        if (channels[j] && channels[j].id) {
                            channelIDs.push(channels[j].id)
                        } else {
                            console.warn("LiveTvReelSlider: Found invalid channel object or missing ID", channels[j]);
                        }
                    }
                } else {
                    console.warn("LiveTvReelSlider: Found invalid channel category element or missing channels array", element);
                }
            }

            console.log("LiveTvReelSlider: Extracted channel IDs", channelIDs); // Log extracted IDs
            // Only fetch if there are IDs
            if (channelIDs.length > 0) {
                initFetchChannelEPGInfo(channelIDs.toString())
            } else {
                 console.log("LiveTvReelSlider: No valid channel IDs found, skipping EPG fetch");
            }
        }

        const initFetchChannelEPGInfo = async (channelIDs) => {
            console.log("LiveTvReelSlider: Fetching EPG info for IDs", channelIDs); // Log IDs being used for EPG fetch
            const epgData = await fetchChannelEPGInfo(channelIDs);
            console.log("LiveTvReelSlider: Fetched EPG data", epgData); // Log fetched EPG data
            setEPGs(epgData);
        }

        if (channelCategories && channelCategories.length > 0) { // Only run if categories are loaded
             getAllChanelsIDs();
        } else {
            console.log("LiveTvReelSlider: channelCategories is empty or null, skipping EPG fetch");
        }

    }, [channelCategories])
    // console.log(channelCategories)
    console.log("LiveTvReelSlider: Rendering component"); // Log before rendering JSX
    return (
        <div>
            {
                channelCategories
                    .filter(channel => channel && channel.channels) // Filter out null/undefined categories or categories without channels
                    .map((channel, index) => {
                    console.log("LiveTvReelSlider: Mapping channel category", channel.name, channel); // Log each channel category

                    // Process channels to merge EPG data before passing to RwContentContainer
                    const processedChannels = EPGs ? channel.channels
                        .filter(movieItem => movieItem && movieItem.id) // Filter out null/undefined movieItems or items without ID
                        .map((movieItem) => {
                        const _movie = { ...movieItem, type: 'livetv' }; // Ensure type is livetv
                        const _epg = EPGs.find(epg => movieItem.id === epg.id);

                        if (_epg) {
                            _movie.shows = _epg.shows;
                            console.log("LiveTvReelSlider: Found EPG for channel", movieItem.id, _epg.shows); // Log EPG found
                        } else {
                            console.log("LiveTvReelSlider: No EPG found for channel", movieItem.id); // Log no EPG found
                        }
                        return _movie;
                    })
                    .filter(movie => movie.shows && movie.shows.length > 0) // Filter to include only movies with EPG data
                    : [];

                    console.log("LiveTvReelSlider: Processed channels for category", channel.name, processedChannels); // Log processed channels

                    // Only render the section if there are processed channels
                    if (processedChannels.length === 0) {
                        console.log(`LiveTvReelSlider: No processed channels with EPG for category ${channel.name}, skipping render.`);
                        return null; // Don't render anything for this category
                    }

                    console.log(`LiveTvReelSlider: Rendering RwContentContainer for category ${channel.name} with ${processedChannels.length} channels.`); // Log before rendering container

                    return (

                        <div className="reel-wrapper-section inner-sections-wrapper" style={{paddingBottom: 0, marginTop: "3.125rem"}} key={channel.id + index} >
                            {/* Use RwContentContainer instead of SliderWrapper and Slider */}
                            {/* Pass the processed channels array as the 'movies' prop */}
                            <div className="rw-header-wrapper">
                                <h2 className="rw-title">{channel.name}</h2>
                                {/* Add any additional header elements here if needed */}
                            </div>
                            {/* Add title manually */}
                            {/* Pass isChannelsSection prop to potentially disable scrollbar */}
                            <RwContentContainer movies={processedChannels} />
                            
                        </div>

                    )
                })
            }
        </div>
    )
}

export default LiveTvReelSlider
