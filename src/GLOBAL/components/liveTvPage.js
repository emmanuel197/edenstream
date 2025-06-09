import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchChannelCategories } from "../redux/channels"; // Import the action to fetch channel categories
import Footer from "../components/Footer";
import Header from "../components/Header";
import LiveTvReelSlider from "../components/home/sliders/LiveTvReelSlider"; // Import the new slider component

const LiveTvPage = () => {
    const dispatch = useDispatch();

    // Fetch channel categories when the component mounts
    useEffect(() => {
        fetchChannelCategories(dispatch);
    }, [dispatch]);

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


