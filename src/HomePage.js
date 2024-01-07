import React from 'react';
import AudioPlayer from './AudioPlayer';
import CustomNavbar from './Navbar';
import GuitaristList from './GuitaristList';
import AddGuitarist from './Guitarist';

function HomePage() {
    return (
    <React.Fragment>
        <CustomNavbar />
        <GuitaristList />
        <AddGuitarist />
        <AudioPlayer />
    </React.Fragment>
  );
}

export default HomePage;