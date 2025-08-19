import { useState } from 'react';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

import Footer from '../components/Footer/Footer';
import "../index.css"

const Body = () => {

  const [game] = useState(false);

  if(game){
    return(
      <div className="body">
      <Header game={game}/>
      <Main game={game} />
    </div>
    );
  }

  return (
    <div className="body">
      <Header game={game} />
      <Main game={game} />
      <Footer />
    </div>
  );
};

export default Body;
