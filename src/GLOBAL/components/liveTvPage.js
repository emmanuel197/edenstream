import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { fetchChannelCategories } from "../redux/channels"; // Import the action to fetch channel categories
import Footer from "../components/Footer";
import Header from "../components/Header";
import LiveTvReelSlider from "../components/home/sliders/LiveTvReelSlider"; // Import the new slider component

const LiveTvPage = () => {
    const dispatch = useDispatch();
    const channelCategories = useSelector(state => state.fetchMovies.channelCategories); // Get channelCategories from state

    console.log("LiveTvPage mounted"); // Log component mount

    // Fetch channel categories when the component mounts
    useEffect(() => {
        console.log("LiveTvPage: Dispatching fetchChannelCategories"); // Log dispatch
        fetchChannelCategories(dispatch);
    }, [dispatch]);

    // Log channelCategories whenever it changes
    useEffect(() => {
        console.log("LiveTvPage: channelCategories state updated", channelCategories);
    }, [channelCategories]);


    return (
        <>
            <main>
                <Header />
                <LiveTvReelSlider />
                <Footer marginTop="9.375rem"/>
            </main>
        </>
    );
};

export default LiveTvPage;


